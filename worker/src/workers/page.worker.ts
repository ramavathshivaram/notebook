import { Job, Worker } from "bullmq";
import redis from "#configs/redis.js";
import { queueConst } from "#utils/const.js";
import logger from "#configs/logger.js";

export interface IPage {
  _id: string;
  title: string;
  content: string;
  sectionId: string;
}

interface CreatePageJob extends Partial<IPage> {}

interface UpdatePageJob {
  pageId: IPage["_id"];
  updatedPage: Partial<IPage>;
}

interface DeletePageJob {
  pageId: IPage["_id"];
}

const pageJob = async (job: Job) => {
  switch (job.name) {
    case "createPage": {
      const data = job.data as CreatePageJob;

      break;
    }

    case "updatePage": {
      const data = job.data as UpdatePageJob;

      break;
    }

    case "deletePage": {
      const data = job.data as DeletePageJob;

      break;
    }

    default:
      logger.error(`Unknown page job: ${job.name}`);
  }
};

const createPageWorker = () =>
  new Worker(queueConst.PAGE, pageJob, {
    connection: redis,
    concurrency: 5,
    removeOnComplete: {
      count: 100,
    },
    removeOnFail: {
      count: 500,
    },
  });

export default createPageWorker;
