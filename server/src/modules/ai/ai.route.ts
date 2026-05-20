import express from "express";
import aiController from "./ai.controller.js";
import validateRequest from "#middlewares/validateRequest.js";
import zodSchema from "#utils/zodSchema.js";

const router = express.Router();


router.post("/ask",validateRequest(zodSchema.askAiSchema), aiController.ask);

export default router;