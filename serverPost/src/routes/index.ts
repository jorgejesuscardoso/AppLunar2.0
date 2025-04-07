import Posts from './posts';
import Users from './users';
import express from 'express';

const router = express.Router();

router.use('/posts', Posts);
router.use('/users', Users);

export default router;
