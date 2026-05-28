import express from "express";

import localController from "./local.controller.js";

import validateRequest from "#middlewares/validateRequest.js";
import authLimitter from "#utils/limitters/auth.limitter.js";

import zodSchema from "#utils/zodSchema.js";

const localRouter: express.Router = express.Router();

localRouter.post(
  "/register",
  authLimitter.registerLimiter,
  validateRequest(zodSchema.registerSchema),
  localController.register,
);

localRouter.post(
  "/login",
  authLimitter.loginLimiter,
  validateRequest(zodSchema.loginSchema),
  localController.login,
);

export default localRouter;
