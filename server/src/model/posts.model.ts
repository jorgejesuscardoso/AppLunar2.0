import { Request, Response } from 'express';
import AWS from 'aws-sdk';
import { IPost } from '../interfaces/IPosts';
import { v4 as uuidv4 } from 'uuid';

// Configurar o DynamoDB
// AWS.config.update({
//     region: process.env.AWS_REGION,
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });

const TABLE_POSTS = process.env.TABLE_POSTS || 'posts';


const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: process.env.AWS_REGION });

class PostsModel {

    constructor() {
    }

    async createPost(data: IPost) {
        try {

            const confereContent = data.content || data.image || data.video;
                
            if (!confereContent || !data.username || !data.userWtp) {
                return { message: "Campos obrigatórios ausentes." };
            }
    
            const newPost: IPost = {
                postId: uuidv4(),
                content: data.content,
                username: data.username,
                userWtp: data.userWtp,
                createdAt: new Date().toISOString(),
                image: data.image || "",
                video: data.video || "",
                comments: data.comments || [],
                likes: data.likes || 0,
                liked: data.liked || false,
                likedBy: data.likedBy || [],
                dislikes: data.dislikes || 0,
                disliked: data.disliked || false,
                dislikedBy: data.dislikedBy || [],
                shares: data.shares || 0,
                shared: data.shared || false,
                sharedBy: data.sharedBy || [],
            };
    
            const params = {
                TableName: TABLE_POSTS,
                Item: newPost,
            };
    
            await dynamoDB.put(params).promise();
    
            return { message: "Post criado com sucesso!", post: newPost };
        } catch (error) {
            console.error("Erro ao criar post:", error); // Evita mandar error como JSON
            return { message: "Erro interno ao criar o post." };
        }
    }
    

    async getPosts() {
        try {
            const params = {
                TableName: TABLE_POSTS,
            };
    
            const response = await dynamoDB.scan(params).promise();
            if (!response.Items) {
                return [];
            }
    
            return response.Items;
        } catch (error) {
            console.error("Erro ao buscar posts:", error);
            return [];
        }
    }
        
}

export default PostsModel;
