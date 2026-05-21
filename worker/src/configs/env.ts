import "dotenv/config";
import { z } from "zod";
import logger from "#configs/logger.js";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(8081),

  REDIS_URL: z.string().min(1, "REDIS_URL is required"),

  BREVO_API_KEY: z.string().min(1, "BREVO_API_KEY is required"),

  SERVER_URL: z
    .string()
    .min(1, "SERVER_URL is required")
    .default("http://localhost:8080"),
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
