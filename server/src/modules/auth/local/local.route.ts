import express from "express";

import localController from "./local.controller.js";
import rateLimiterMiddleware, {
  authLimiter,
} from "#middlewares/rateLimiter.js";
import validateRequest from "#middlewares/validateRequest.js";
import zodSchema from "#utils/zodSchema.js";

const localRouter: express.Router = express.Router();

localRouter.post(
  "/register",
  rateLimiterMiddleware(authLimiter),
  validateRequest(zodSchema.registerSchema),
  localController.register,
);

localRouter.post(
  "/login",
  rateLimiterMiddleware(authLimiter),
  validateRequest(zodSchema.loginSchema),
  localController.login,
);

export default localRouter;
