import { Queue } from "bullmq";
import redis from "#configs/redis.js";
import { queueConst } from "#utils/const.js";

const defaultJobOptions = {
  attempts: 3,
  backoff: {
    type: "exponential",
    delay: 3000,
  },
  removeOnComplete: true,
  removeOnFail: 100,
};

export const emailQueue = new Queue(queueConst.SEND_EMAIL, {
  connection: redis,
  defaultJobOptions: {
    ...defaultJobOptions,
    priority: 2,
  },
});

export const sectionQueue = new Queue(queueConst.SECTION, {
  connection: redis,
  defaultJobOptions: {
    ...defaultJobOptions,
    priority: 5,
  },
});

export const pageQueue = new Queue(queueConst.PAGE, {
  connection: redis,
  defaultJobOptions: {
    ...defaultJobOptions,
    priority: 5,
  },
});

export const messageQueue = new Queue(queueConst.MESSAGE, {
  connection: redis,
  defaultJobOptions: {
    ...defaultJobOptions,
    priority: 5,
  },
});
