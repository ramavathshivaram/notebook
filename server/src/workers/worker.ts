import logger from "#configs/logger.js";

import { Worker } from "bullmq";

import workerEventHandlers from "#utils/workerEventHandlers.js";

import emailWorker from "./email.worker.js";
import pageWorker from "./page.worker.js";
import messageWorker from "./message.worker.js";
import sectionWorker from "./section.worker.js";

const workerFactories = [emailWorker, pageWorker, messageWorker, sectionWorker];

let workers: Worker[] = [];

const start = async (): Promise<void> => {
  workers = workerFactories.map((createWorker) => {
    const worker = createWorker();

    workerEventHandlers(worker);

    return worker;
  });

  logger.info("All workers started");
};

const close = async (): Promise<void> => {
  logger.info("Closing workers...");

  await Promise.all(workers.map((worker) => worker.close()));

  logger.info("All workers closed");
};

export default {
  start,
  close,
};
