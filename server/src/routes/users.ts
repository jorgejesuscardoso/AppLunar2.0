import express, { Request, Response } from 'express';
import userController from '../controller/user.controller';
import { authToken } from '../middleware/auth';
import { verifyTokenOnLogin } from '../middleware/auth';

const router = express.Router();
const user = new userController();

router.get('/verifyToken', (req: Request, res: Response) => {
    verifyTokenOnLogin(req, res);
});


router.post('/login', (req: Request, res: Response) => {
    user.auth(req, res);
});

router.post('/', (req: Request, res: Response) => {
    user.createUser(req, res);
});

router.get('/all', authToken, (req: Request, res: Response) => {
    user.getAllUsers(req, res);
});

router.get('/', authToken, (req: Request, res: Response) => {
    user.getUserByWtp(req, res);
});

router.put('/:userWtpd', authToken, (req: Request, res: Response) => {
    user.updateUser(req, res);
});

export default router;