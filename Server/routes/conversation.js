import { Router } from "express";
import ConversationController from  "../controllers/conversationController.js";

const router = Router();
//new conv

router.post("/", ConversationController.postConversation);

//get conv of a user

router.get("/:userId", ConversationController.getAUserConversation);

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", ConversationController.getConversationTwoUserId);

export default router;
