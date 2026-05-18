import env from "#configs/env.js";
import logger from "#configs/logger.js";
import connectDB, { disconnectDB } from "#configs/mongoDB.js";
import { checkRedis, disconnectRedis } from "#configs/redis.js";
import app from "./app.js";

let server: any;

const serverInit = async () => {
  try {
    logger.info("Starting server...");

    await checkRedis();
    await connectDB();

    server = app.listen(env.PORT, () => {
      logger.info(`Server started on ${env.PORT}`);
    });
  } catch (error) {
    logger.error("Server startup failed", error);
    process.exit(1);
  }
};

serverInit();

const gracefulShutdown = async () => {
  try {
    logger.info("Shutting down server...");

    if (server) {
      server.close(async () => {
        await disconnectRedis();
        await disconnectDB();

        logger.info("Server closed");
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  } catch (err) {
    logger.error("Shutdown error", err);
    process.exit(1);
  }
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
