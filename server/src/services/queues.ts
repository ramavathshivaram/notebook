import { Queue } from "bullmq";
import redis from "#configs/redis.js";

import { queueConst } from "#utils/const.js";

export const emailQueue = new Queue(queueConst.SEND_EMAIL, {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 3000,
    },
    removeOnComplete: true,
    removeOnFail: 100,
    priority: 2,
  },
});