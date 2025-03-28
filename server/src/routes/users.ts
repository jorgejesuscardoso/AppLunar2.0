import express, { Request, Response } from 'express';
import userController from '../controller/user.controller';
import { authToken } from '../middleware/auth';

const router = express.Router();
const user = new userController();


router.post('/login', (req: Request, res: Response) => {
    user.auth(req, res);
});

router.post('/users', authToken, (req: Request, res: Response) => {
    user.createUser(req, res);
});

router.get('/users/all', authToken, (req: Request, res: Response) => {
    user.getAllUsers(req, res);
});

router.get('/users', authToken, (req: Request, res: Response) => {
    user.getUserByWtp(req, res);
});

router.put('/users/:userWtpd', authToken, (req: Request, res: Response) => {
    user.updateUser(req, res);
});

export default router;