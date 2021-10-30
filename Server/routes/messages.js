import { Router } from "express";
import MessageController from  "../controllers/messageController.js";

const router = Router();

//add

router.post("/",MessageController.addMessage );

//get

router.get("/:conversationId",MessageController.getMessage );

export default router;
