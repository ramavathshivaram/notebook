import logger from "#configs/logger.js";
import { Worker } from "bullmq";
import { checkRedis, disconnectRedis } from "#configs/redis.js";
import workerEventHandlers from "#utils/workerEventHandlers.js";

import emailWorker from "#workers/email.worker.js";
import pageWorker from "#workers/page.worker.js";
import messageWorker from "#workers/message.worker.js";

const workerFactories = [emailWorker, pageWorker, messageWorker];

let workers: Worker[] = [];

const startWorkers = async (): Promise<void> => {
  try {
    await checkRedis();

    workers = workerFactories.map((createWorker: () => Worker) => {
      const worker = createWorker();

      workerEventHandlers(worker);

      return worker;
    });

    logger.info("🚀 All workers started");
  } catch (error) {
    logger.error("❌ Worker startup failed", error);

    process.exit(1);
  }
};

const gracefulShutdown = async (): Promise<void> => {
  logger.info("🛑 Shutting down workers...");

  try {
    await Promise.all(workers.map((worker) => worker.close()));

    await disconnectRedis();

    logger.info("✅ All workers shut down cleanly");

    process.exit(0);
  } catch (error) {
    logger.error("❌ Shutdown error", error);

    process.exit(1);
  }
};

startWorkers();

process.once("SIGINT", gracefulShutdown);

process.once("SIGTERM", gracefulShutdown);

process.once("uncaughtException", async (error) => {
  logger.error("🚨 Uncaught Exception", error);

  await gracefulShutdown();
});

process.once("unhandledRejection", async (reason) => {
  logger.error("🚨 Unhandled Promise Rejection", reason);

  await gracefulShutdown();
});
