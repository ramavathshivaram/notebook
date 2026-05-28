import express from "express";

import aiController from "./ai.controller.js";

import validateRequest from "#middlewares/validateRequest.js";

import zodSchema from "#utils/zodSchema.js";
import aiLimitter from "#utils/limitters/ai.limitter.js";

const router = express.Router();

router.post(
  "/ask",
  aiLimitter.askAiLimiter,
  validateRequest(zodSchema.askAiSchema),
  aiController.ask,
);

export default router;
