import express from "express";

import forgotPasswordController from "./forgot-password.controller.js";
import authLimitter from "#utils/limitters/auth.limitter.js";

import validateRequest from "#middlewares/validateRequest.js";

import zodSchema from "#utils/zodSchema.js";

const forgotPasswordRouter = express.Router();


forgotPasswordRouter.post(
  "/forgot",
  authLimitter.forgotLimiter,
  validateRequest(zodSchema.forgotPasswordSchema),
  forgotPasswordController.forgotPassword,
);

forgotPasswordRouter.post(
  "/verify-otp",
  authLimitter.verifyOtpLimiter,
  validateRequest(zodSchema.verifyOTPSchema),
  forgotPasswordController.verifyOTP,
);

forgotPasswordRouter.post(
  "/reset",
  authLimitter.resetPasswordLimiter,
  validateRequest(zodSchema.resetPasswordSchema),
  forgotPasswordController.resetPassword,
);

export default forgotPasswordRouter;
