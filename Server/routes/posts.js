import { Router } from "express";
import PostController from "../controllers/posts.js";
import authValidator from "../middleware/authValidator.js";

const router = Router();
//create a post
router.post("/", authValidator, PostController.createPost);

//update a post
router.put("/:id", PostController.updatePost);

//delete a post
router.delete("/:id", PostController.deletePost);

//like / dislike a post
router.put("/:id/like", PostController.likeOrUnlikePost);
//get a post

router.get("/:id", PostController.getOnePost);

//get timeline posts

router.get("/timeline/:userId", PostController.getTimelinePost);

//get user's all posts

router.get("/profile/:username",PostController.getUsersAllPost);

export default router;
