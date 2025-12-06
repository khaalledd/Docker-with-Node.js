import express from 'express';
import {createPost, getPosts, getPostById, updatePost, deletePost} from '../controllers/postController.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.route('/').post(authMiddleware,createPost).get(getPosts);

router.route('/:id').get(getPostById).put(updatePost).delete(deletePost);



export default router;
