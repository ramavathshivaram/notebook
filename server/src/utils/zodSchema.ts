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

const createSectionSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
});
const renameSectionSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
});

const createMessageSchema = z.object({
  content: z.string().trim().min(1, "Message is required"),
  resourceId: z.string().trim().min(1, "Resource ID is required"),
  role: z.string().trim().min(1, "Role is required"),
});


const askAiSchema = z.object({
   resourceId: z.string().trim().min(1, "Resource ID is required")
   , content: z.string().trim().min(1, "Message is required")
   , resourceType: z.string().trim().min(1, "Resource Type is required")
});

export default {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  verifyOTPSchema,
  resetPasswordSchema,

  createSectionSchema,
  renameSectionSchema,

  createMessageSchema,

  askAiSchema
};
