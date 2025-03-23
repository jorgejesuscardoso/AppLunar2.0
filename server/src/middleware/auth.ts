import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/jwt';

export const authToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(401).json({ message: 'Token não encontrado' });
        return;
    }

    try {
        if(!token.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Formato inválido de token' });
            return;
        }

        const getToken = token.split('Bearer ')[1];

        const user = verifyToken(getToken);
        if (!user) {
            res.status(401).json({ message: 'Token inválido' });
            return;
        }
    
        next(); // Chamando next() corretamente
    } catch (error) {
        res.status(401).json({ message: 'Erro ao processar o token.' });
        return;
    }
};


