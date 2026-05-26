import { Job, Worker } from "bullmq";

import redis from "#configs/redis.js";

import { queueConst } from "#utils/const.js";

import messageRepository from "#modules/message/message.repository.js";

export interface IMessage {
  _id: string;
  role: string;
  content: string;
  resourceId: string;
}

interface CreateMessageJob extends Partial<IMessage> {}

const messageJob = async (job: Job<CreateMessageJob>) => {
  switch (job.name) {
    case "createMessage":
      return await messageRepository.createMessage(job.data);

    default:
      throw new Error(`Unknown message job: ${job.name}`);
  }
};

const createMessageWorker = () =>
  new Worker<CreateMessageJob>(queueConst.MESSAGE, messageJob, {
    connection: redis,

    concurrency: 5,

    removeOnComplete: {
      count: 100,
    },

    removeOnFail: {
      count: 500,
    },
  });

export default createMessageWorker;
