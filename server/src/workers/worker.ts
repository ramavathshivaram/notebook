import logger from "#configs/logger.js";
import { Worker } from "bullmq";
import workerEventHandlers from "#utils/workerEventHandlers.js";

import emailWorker from "./email.worker.js";
import pageWorker from "./page.worker.js";
import messageWorker from "./message.worker.js";

const workerFactories = [emailWorker, pageWorker, messageWorker];

let workers: Worker[] = [];

const start = async (): Promise<void> => {
  try {
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

const close = async (): Promise<void> => {
  logger.info("🛑 Shutting down workers...");

  try {
    await Promise.all(workers.map((worker) => worker.close()));

    logger.info("✅ All workers shut down cleanly");

    process.exit(0);
  } catch (error) {
    logger.error("❌ Shutdown error", error);

    process.exit(1);
  }
};

export default { start, close };
