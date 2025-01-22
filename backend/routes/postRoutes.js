import express from "express";
import { postRouteEntry, createNewPost, getAllPosts, updatePost, deletePost } from "../controllers/postControllers/basicControllers.js";
import { incrementPostLike, decrementPostLike } from '../controllers/postControllers/postLikeController.js';
const postRoutes = express.Router();

postRoutes.get("/", postRouteEntry);
postRoutes.get("/allPosts", getAllPosts);
postRoutes.post("/newPost", createNewPost);
postRoutes.put("/updatePost/:postid", updatePost);
postRoutes.delete("/deletePost/:postid", deletePost);

//Like related route
postRoutes.patch('/:postId/like', incrementPostLike);
postRoutes.patch('/:postId/unlike', decrementPostLike);

export default postRoutes;