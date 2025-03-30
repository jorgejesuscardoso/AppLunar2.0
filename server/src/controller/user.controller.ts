import { Request, Response } from 'express';
import AWS from 'aws-sdk';
import { formatedReturn, formatedReturnToAll } from '../helpers/formatedReturn';
import bcrypt from 'bcryptjs';
import { TUsers } from '../types/TUser';
import { generateToken } from '../helpers/jwt';

// // Configurar o DynamoDB
// AWS.config.update({
//     region: process.env.AWS_REGION,
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });

const TABLE_NAME = process.env.TABLE_AWS || 'dbLunar2';


const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: process.env.AWS_REGION });

class UserController {
    public bcrypt = bcrypt;
    constructor() {
        this.bcrypt = bcrypt;
    }

    // 🔹 Buscar usuário para autenticar login
    async auth(req: Request, res: Response) {
        const { user, password } = req.body;
    
        if (!user || !password) {
            return res.status(400).json({ error: "Os parâmetros 'user' e 'password' são obrigatórios." });
        }
    
        try {
            // Usando o método query para buscar usuários com a chave de partição (id)
            const params = {
                TableName: TABLE_NAME,
                IndexName: 'user-index', // Certifique-se que o índice existe
                KeyConditionExpression: '#user = :user',
                ExpressionAttributeNames: {
                    '#user': 'user' // Mapeia o nome real do atributo
                },
                ExpressionAttributeValues: {
                    ':user': user
                }
            };
    
            const result = await dynamoDB.query(params).promise();

            if (!result.Items || result.Items.length === 0) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }
    
            const userFound = result.Items[0] as TUsers;

            if (userFound.isDeleted) {
                return res.status(403).json({ error: "Usuário desativado." });
            }
            
            if(!await this.bcrypt.compare(password, userFound.password)) {
                return res.status(401).json({ error: "Senha inválida." });
            }

            const token = generateToken({ userWtp: userFound.userWtp, role: userFound.role, subRole: userFound.subRole });
    
            res.status(200).json(token);
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            res.status(500).json({ error: "Erro ao buscar usuário", details: error });
        }
    }
    
    // 🔹 Criar usuário (com validação e async/await)
    async createUser(req: Request, res: Response) {
        try {
            const {
                name,
                user,
                age,
                password,
                userWtp,
                phone,
                role,
                subRole,
                status,
                points = 0,
                books = [],
                subs = [],
                isDeleted = false
            } = req.body as TUsers;

            if (!name || !user || !password || !userWtp) {
                return res.status(400).json({ error: "Campos obrigatórios estão faltando." });
            }

            // 🔹 Verifica se o usuário já existe
            const checkUser = await dynamoDB.query({
                TableName: TABLE_NAME,
                IndexName: 'userWtp-index',
                KeyConditionExpression: 'userWtp = :userWtp',
                ExpressionAttributeValues: {
                    ':userWtp': userWtp
                }
            }).promise();

            if (checkUser.Items && checkUser.Items.length > 0) {
                return res.status(409).json({ error: "Usuário já existe." });
            }

            const params = {
                TableName: TABLE_NAME,
                Item: {
                    user: userWtp,
                    name,
                    age: Number(age) || 0,
                    password,
                    userWtp,
                    phone,
                    role,
                    subRole,
                    status,
                    points: Number(points),
                    books,
                    subs,
                    isDeleted
                }
            };

            const hash = await this.bcrypt.hash(password, 10);
            params.Item.password = hash;

            await dynamoDB.put(params).promise();
            console.log('Usuário criado com sucesso:', params.Item);

            res.status(201).json({ message: "Usuário criado com sucesso", user: params.Item });

        } catch (error) {
            console.error('Erro inesperado ao criar usuário:', error);
            res.status(500).json({ error: "Erro inesperado no servidor", details: error });
        }
    }
    
    // 🔹 Listar todos os usuários
    async getAllUsers(req: Request, res: Response) {
        try {
            const params = {
                TableName: TABLE_NAME
            };
    
            const result = await dynamoDB.scan(params).promise();
    
            if (!result.Items || result.Items.length === 0) {
                return res.status(404).json({ error: "Nenhum usuário encontrado." });
            }
            
            const formatReturnUsers = formatedReturnToAll(result.Items as TUsers[]);

            res.status(200).json(formatReturnUsers);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            res.status(500).json({ error: "Erro ao buscar usuários", details: error });
        }
    }

    // 🔹 Buscar usuário por userWtp (usando Query, sem Scan)
    async getUserByWtp(req: Request, res: Response) {
        const { userWtp } = req.query;
    
        if (!userWtp) {
            return res.status(400).json({ error: "O parâmetro 'userWtp' é obrigatório." });
        }
    
        try {
            // Usando o método query para buscar usuários com a chave de partição (id)
            const result = await dynamoDB.query({
                TableName: TABLE_NAME,
                IndexName: 'userWtp-index',
                KeyConditionExpression: 'userWtp = :userWtp',
                ExpressionAttributeValues: {
                    ':userWtp': userWtp
                }
            }).promise();
    
            
            if (!result.Items || result.Items.length === 0) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }
    
            const formatReturnUsers = formatedReturn(result.Items[0] as TUsers);

            res.status(200).json(formatReturnUsers);
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            res.status(500).json({ error: "Erro ao buscar usuário", details: error });
        }
    }    

    // 🔹 Atualizar usuário
    async updateUser(req: Request, res: Response) {
        const { userWtpd }= req.params;

        if (!userWtpd) {
            return res.status(400).json({ error: "O parâmetro 'userWtp' é obrigatório." });
        }
        
        try {

            const results =await dynamoDB.query({
                TableName: TABLE_NAME,
                IndexName: 'userWtp-index',
                KeyConditionExpression: 'userWtp = :userWtp',
                ExpressionAttributeValues: {
                    ':userWtp': userWtpd
                }
            }).promise();

            if (!results.Items || results.Items.length === 0) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            const {
                name,
                age,
                password,
                userWtp,
                phone,
                role,
                subRole,
                status,
                points,
                books,
                subs,
                isDeleted
            } = req.body as TUsers;
            
            const hash = password ? await this.bcrypt.hash(password, 10) : results.Items[0].password;

    
            const params = {
                TableName: TABLE_NAME,
                Key: {
                    user: results.Items[0].user
                },
                UpdateExpression: `set #name = :name, age = :age, password = :password, userWtp = :userWtp, phone = :phone, #role = :role, subRole = :subRole, #status = :status, points = :points, books = :books, subs = :subs, isDeleted = :isDeleted`,
                ExpressionAttributeNames: {
                    '#name': 'name',
                    '#role': 'role',
                    '#status': 'status' // Adicionado para evitar conflito com nome reservado
                },
                ExpressionAttributeValues: {
                    ':name': name || results.Items[0].name,
                    ':age': age || results.Items[0].age,
                    ':password': hash,
                    ':userWtp': userWtp || results.Items[0].userWtp,
                    ':phone': phone || results.Items[0].phone,
                    ':role': role || results.Items[0].role,
                    ':subRole': subRole || results.Items[0].subRole,
                    ':status': status || results.Items[0].status,
                    ':points': points || results.Items[0].points,
                    ':books': books || results.Items[0].books,
                    ':subs': subs || results.Items[0].subs,
                    ':isDeleted': isDeleted || results.Items[0].isDeleted,
                },
                ReturnValues: 'UPDATED_NEW'
            };
            
            const result = await dynamoDB.update(params).promise();
                
            const formatReturnUsers = formatedReturn(result.Attributes as TUsers);

            res.status(200).json(formatReturnUsers);
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            res.status(500).json({ error: "Erro ao atualizar usuário", details: error });
        }
    }
}

export default UserController;
