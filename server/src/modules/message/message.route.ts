import express from "express";
import messageController from "./message.controller.js";
import validateRequest from "#middlewares/validateRequest.js";
import zodSchema from "#utils/zodSchema.js";

const router = express.Router();

router.post(
  "/",
  validateRequest(zodSchema.createMessageSchema),
  messageController.create,
);

router.get("/all/:resourceId", messageController.getMessages);

export default router;
