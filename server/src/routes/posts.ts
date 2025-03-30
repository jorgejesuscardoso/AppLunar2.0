import express, { Request, Response } from 'express';
import PostsModel from '../model/posts.model';

const router = express.Router();
const posts = new PostsModel();

// Rota para criar um novo post
// POST /posts
router.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const response = await posts.createPost(data);
        res.status(200).json(response);
    } catch (error) {
        console.error("Erro ao criar post:", error);
        res.status(500).json({ message: "Erro interno ao criar o post.", error });
    }
});

// Rota para buscar todos os posts
// GET /posts
router.get('/', async (req: Request, res: Response) => {
    try {
        const data = await posts.getPosts();  // Aguarda a resposta
        res.json({ success: true, data });   // Retorna os dados corretamente
    } catch (error) {
        console.error("Erro ao buscar posts:", error);
        res.status(500).json({ success: false, message: "Erro interno ao buscar posts" });
    }
});



export default router;