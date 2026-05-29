import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import ApiError from "#utils/ApiError.js";
import { hashPassword, generateOTP } from "#services/password.service.js";
import authRepository from "../auth.repository.js";
import redis from "#configs/redis.js";
import { deleteSession, setSession } from "#services/session.service.js";
import { emailQueue } from "#services/queues.js";

interface ForgotPasswordBody {
  email: string;
}

interface VerifyOTPBody {
  email: string;
  otp: string;
}

interface ResetPasswordBody {
  email: string;
  otp: string;
  password: string;
}

const forgotPassword = asyncHandler(
  async (req: Request<{}, {}, ForgotPasswordBody>, res: Response) => {
    const { email } = req.body;

    const authResponse = await authRepository.checkAuthExists({ email });

    if (!authResponse) {
      throw new ApiError(404, "User not found");
    }

    const otp: string = generateOTP();

    await emailQueue.add(
      "send-otp-email",
      {
        email,
        subject: "OTP Verification",
        data: { otp },
      },
      { priority: 1 },
    );

    await redis.set(`otp:${email}`, otp, "EX", 900);

    res.status(200).json({
      message: "OTP sent to your email",
      success: true,
    });
  },
);

const verifyOTP = asyncHandler(
  async (req: Request<{}, {}, VerifyOTPBody>, res: Response) => {
    const { otp, email } = req.body;

    const otpFromRedis = await redis.get(`otp:${email}`);

    if (!otpFromRedis || otpFromRedis !== otp) {
      throw new ApiError(404, "Invalid OTP");
    }

    res.json({ message: "OTP verified", success: true });
  },
);

const resetPassword = asyncHandler(
  async (req: Request<{}, {}, ResetPasswordBody>, res: Response) => {
    const { otp, password, email } = req.body;

    const otpFromRedis = await redis.get(`otp:${email}`);

    if (!otpFromRedis || otpFromRedis !== otp) {
      throw new ApiError(404, "Invalid OTP");
    }

    const hashedPassword = await hashPassword(password);

    const authResponse = await authRepository.findUserByEmailAndUpdate(email, {
      password: hashedPassword,
      $inc: { tokenVersion: 1 },
    });

    await setSession(authResponse?._id, authResponse.tokenVersion);

    await deleteSession(authResponse?._id);

    res.json({
      message: "Password reset successful",
      success: true,
    });
  },
);

export default {
  forgotPassword,
  verifyOTP,
  resetPassword,
};
