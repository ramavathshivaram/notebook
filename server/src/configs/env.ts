import "dotenv/config";
import { z } from "zod";
import logger from "#configs/logger.js";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(8080),

  REDIS_HOST: z.string().default("127.0.0.1"),
  REDIS_PORT: z.coerce.number().default(6379),

  ORIGIN: z.string().min(1, "ORIGIN is required"),

  MONGODB_URI: z
    .string()
    .min(1, "MONGODB_URI is required")
    .default("mongodb://127.0.0.1:27017/note-book"),

  JWT_SECRET_KEY: z.string().min(1, "JWT_SECRET_KEY is required"),

  SMTP_PASSWORD: z.string().min(1, "SMTP_PASSWORD is required"),
  SMTP_USER: z.string().min(1, "SMTP_USER is required"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  logger.error("❌ Invalid environment variables");
  logger.error(parsed.error.message);
  process.exit(1);
}

const env = {
  ...parsed.data,
  isProd: parsed.data.NODE_ENV === "production",
};

export default env;
