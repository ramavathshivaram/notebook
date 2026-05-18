import express from "express";

import authenticate from "#middlewares/authenticate.js";
import {
  rateLimiterMiddleware,
  refreshLimiter,
  authCheckLimiter,
} from "#middlewares/rateLimiter.js";

import authController from "./auth.controller.js";

const authRouter = express.Router();

authRouter.get(
  "/check",
  authenticate,
  rateLimiterMiddleware(authCheckLimiter),
  authController.authCheck,
);

authRouter.get(
  "/refresh",
  rateLimiterMiddleware(refreshLimiter),
  authController.refreshTokenController,
);

authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;
