import logger from "#configs/logger.js";
import type { Worker } from "bullmq";

const workerEventHandlers = (worker: Worker): void => {
  const name = worker.name;

  worker.on("ready", () => {
    logger.info(`✅ Worker ready: ${name}`);
  });

  worker.on("active", (job) => {
    logger.info(`⚡ Job ${job.id} started in ${name}`);
  });

  worker.on("completed", (job) => {
    logger.info(`✅ Job ${job.id} completed in ${name}`);
  });

  worker.on("failed", (job, err) => {
    logger.error(`❌ Job ${job?.id} failed in ${name}`, {
      message: err?.message,
    });
  });

  worker.on("stalled", (jobId) => {
    logger.warn(`⚠️ Job ${jobId} stalled in ${name}`);
  });

  worker.on("error", (err) => {
    logger.error(`🚨 Worker error in ${name}`, {
      message: err.message,
    });
  });

  worker.on("closing", () => {
    logger.info(`🔌 Worker closing: ${name}`);
  });

  worker.on("closed", () => {
    logger.info(`🛑 Worker closed: ${name}`);
  });
};

export default workerEventHandlers;
