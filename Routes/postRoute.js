import  express from "express";
import { createPost, deletePost, getPost, getTimelinePosts, updatePost } from "../Controllers/postController.js";
const postrouter= express.Router();
postrouter.post('/',createPost);
postrouter.get('/:id',getPost);
postrouter.put('/:id',updatePost);
postrouter.delete('/:id',deletePost);
postrouter.put('/:id/like',updatePost);
postrouter.get("/:id/timeline",getTimelinePosts);
export default postrouter;