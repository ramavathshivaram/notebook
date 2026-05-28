import express from "express";

import authenticate from "#middlewares/authenticate.js";
import authLimitter from "#utils/limitters/auth.limitter.js";

import authController from "./auth.controller.js";

const authRouter = express.Router();

authRouter.get(
  "/check",
  authenticate,
  authLimitter.authCheckLimiter,
  authController.authCheck,
);

authRouter.get(
  "/refresh",
  authLimitter.refreshLimiter,
  authController.refreshTokenController,
);

authRouter.post(
  "/logout",
  authenticate,
  authLimitter.logoutLimiter,
  authController.logout,
);

export default authRouter;
