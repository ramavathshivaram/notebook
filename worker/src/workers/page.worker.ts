import { Job, Worker } from "bullmq";
import redis from "#configs/redis.js";
import logger from "#configs/logger.js";
import { queueConst } from "#utils/const.js";
import pageApi from "#services/page.api.js";

interface CreatePageJob extends Partial<IPage> {}

interface UpdatePageJob {
  _id: string;
  updatedPage: Partial<IPage>;
}

interface DeletePageJob {
  deleteId: string;
}

const pageJob = async (job: Job) => {
  switch (job.name) {
    case "createPage": {
      const data = job.data as CreatePageJob;

      await pageApi.createPageApi(data);

      break;
    }

    case "updatePage": {
      const data = job.data as UpdatePageJob;

      await pageApi.updatePageApi(data._id, data.updatedPage);

      break;
    }

    case "deletePage": {
      const data = job.data as DeletePageJob;

      await pageApi.deletePageApi(data.deleteId);

      break;
    }

    default:
      throw new Error(`Unknown page job: ${job.name}`);
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
