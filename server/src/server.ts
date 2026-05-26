import http from "http";

import env from "#configs/env.js";
import logger from "#configs/logger.js";
import connectDB, { disconnectDB } from "#configs/mongoDB.js";
import { checkRedis, disconnectRedis } from "#configs/redis.js";

import worker from "#workers/worker.js";

import app from "./app.js";

const server = http.createServer(app);

let isShuttingDown = false;

const serverInit = async () => {
  try {
    logger.info("Starting server...");

    await checkRedis();

    await connectDB();

    await worker.start();

    server.listen(env.PORT, () => {
      logger.info(`Server started on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error("Server startup failed", error);

    process.exit(1);
  }
};

serverInit();

const gracefulShutdown = async (signal: string) => {
  if (isShuttingDown) return;

  isShuttingDown = true;

  logger.info(`${signal} received. Shutting down...`);

  try {
    server.close(async (err) => {
      if (err) {
        logger.error("Error while closing server", err);

        process.exit(1);
      }

      try {
        await worker.close();

        await disconnectRedis();

        await disconnectDB();

        logger.info("Graceful shutdown completed");

        process.exit(0);
      } catch (cleanupError) {
        logger.error("Cleanup failed", cleanupError);

        process.exit(1);
      }
    });
  } catch (error) {
    logger.error("Shutdown failed", error);

    process.exit(1);
  }
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Promise Rejection", reason);
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception", error);

  process.exit(1);
});
