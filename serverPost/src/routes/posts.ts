import express, { Request, Response } from 'express';
import PostsModel from '../model/posts.model';

const router = express.Router();
const posts = new PostsModel();




export default router;