import express, { Request, Response } from 'express';
import { verifyTokenOnLogin } from '../middleware/auth';

const router = express.Router();

router.get('/verifyToken', (req: Request, res: Response) => {
    verifyTokenOnLogin(req, res);
});

export default router;