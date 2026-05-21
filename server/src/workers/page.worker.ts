import { Job, Worker } from "bullmq";
import redis from "#configs/redis.js";
import { queueConst } from "#utils/const.js";
import pageRepository from "#modules/page/page.repository.js";

export interface IPage {
  title: string;
  content: string;
  sectionId: string;
}

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

      await pageRepository.create(data);

      break;
    }

    case "updatePage": {
      const data = job.data as UpdatePageJob;

      await pageRepository.update(data._id, data.updatedPage);

      break;
    }

    case "deletePage": {
      const data = job.data as DeletePageJob;

      await pageRepository.deletePage(data.deleteId);

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
