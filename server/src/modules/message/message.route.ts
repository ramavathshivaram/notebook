import express from "express";
import messageController from "./message.controller.js";

const router = express.Router();

router.get("/all/:resourceId", messageController.getMessages);

export default router;
