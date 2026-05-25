import "dotenv/config";
import { z } from "zod";
import logger from "#configs/logger.js";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),

  REDIS_HOST: z.string().min(1, "REDIS_HOST is required").default("127.0.0.1"),
  REDIS_PORT: z.coerce.number().default(6379),

  BREVO_API_KEY: z.string().min(1, "BREVO_API_KEY is required"),

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
