import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const registerSchema = z.object({
  userName: z.string(),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const forgotPasswordSchema = z.object({ email: z.string().email() });

const verifyOTPSchema = z.object({
  otp: z.string().min(6).max(6),
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long"),
  otp: z.string().min(6).max(6),
  email: z.string().email(),
});

const googleLoginSchema = z.object({
  accessToken: z.string(),
});

const googleRegisterSchema = z.object({
  accessToken: z.string(),
});

export default {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  verifyOTPSchema,
  resetPasswordSchema,
  googleLoginSchema,
  googleRegisterSchema,
};
