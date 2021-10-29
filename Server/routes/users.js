import { Router } from "express";
import UserController from "../controllers/users.js"

const router= Router();
//update user
router.put("/:id", UserController.updateUser);

//delete user
router.delete("/:id", UserController.deleteUser);

//get a user
router.get("/", UserController.getAUser);

//get friends
router.get("/friends/:userId", UserController.getAFriend);

//follow a user

router.put("/:id/follow", UserController.followAUser);

//unfollow a user

router.put("/:id/unfollow", UserController.unfollowAUser);

export default router;
