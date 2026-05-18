import express from "express";

import forgotPasswordController from "./forgot-password.controller.js";
import rateLimiterMiddleware, { otpLimiter } from "#middlewares/rateLimiter.js";
import validateRequest from "#middlewares/validateRequest.js";
import zodSchema from "#utils/zodSchema.js";

const forgotPasswordRouter = express.Router();

forgotPasswordRouter.post(
  "/forgot",
  rateLimiterMiddleware(otpLimiter),
  validateRequest(zodSchema.forgotPasswordSchema),
  forgotPasswordController.forgotPassword,
);

forgotPasswordRouter.post(
  "/verify-otp",
  rateLimiterMiddleware(otpLimiter),
  validateRequest(zodSchema.verifyOTPSchema),
  forgotPasswordController.verifyOTP,
);

forgotPasswordRouter.post(
  "/reset",
  rateLimiterMiddleware(otpLimiter),
  validateRequest(zodSchema.resetPasswordSchema),
  forgotPasswordController.resetPassword,
);

export default forgotPasswordRouter;
