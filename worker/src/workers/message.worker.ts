import { Job, Worker } from "bullmq";
import redis from "#configs/redis.js";
import { queueConst } from "#utils/const.js";
import messageApi from "#services/message.api.js";

export interface IMessage {
  role: string;
  content: string;
  resourceId: string;
}

interface CreateMessageJob extends Partial<IMessage> {}

const messageJob = async (job: Job) => {
  switch (job.name) {
    case "createMessage": {
      const data = job.data as CreateMessageJob;

      await messageApi.createMessageApi(data);

      break;
    }

    default:
      throw new Error(`Unknown message job: ${job.name}`);
  }
};

const createMessageWorker = () =>
  new Worker(queueConst.MESSAGE, messageJob, {
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
