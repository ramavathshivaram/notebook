import express from "express";

import messageController from "./message.controller.js";
import massageLimitter from "#utils/limitters/message.limitter.js";

const router = express.Router();

router.get(
  "/all/:resourceId",
  massageLimitter.getMessagesLimiter,
  messageController.getMessages,
);

export default router;
