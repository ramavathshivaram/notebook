import logger from "#configs/logger.js";
import { Worker } from "bullmq";

import { checkRedis, disconnectRedis } from "#configs/redis.js";

import workerEventHandlers from "#utils/workerEventHandlers.js";

import emailWorker from "./email.worker.js";
import pageWorker from "./page.worker.js";
import messageWorker from "./message.worker.js";

const workerFactories = [emailWorker, pageWorker, messageWorker];

let workers: Worker[] = [];

let shuttingDown = false;

const start = async (): Promise<void> => {
  try {
    await checkRedis();

    workers = workerFactories.map((createWorker: () => Worker) => {
      const worker = createWorker();

      workerEventHandlers(worker);

      logger.info(`✅ Worker started: ${worker.name}`);

      return worker;
    });

    logger.info("🚀 All workers started");
  } catch (error) {
    logger.error("❌ Worker startup failed", error);

    process.exit(1);
  }
};

const close = async (signal: string): Promise<void> => {
  if (shuttingDown) return;

  shuttingDown = true;

  logger.info(`🛑 Received ${signal}, shutting down workers...`);

  try {
    await Promise.all(
      workers.map(async (worker) => {
        logger.info(`Closing worker: ${worker.name}`);

        await worker.close();
      }),
    );

    logger.info("✅ All workers shut down cleanly");

    await disconnectRedis();

    process.exit(0);
  } catch (error) {
    logger.error("❌ Shutdown error", error);

    process.exit(1);
  }
};

export default { start, close };