import { Job, Worker } from "bullmq";
import redis from "#configs/redis.js";
import logger from "#configs/logger.js";
import { queueConst } from "#utils/const.js";
import pageRepository from "#modules/page/page.repository.js";

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

type PageJobData = CreatePageJob | UpdatePageJob | DeletePageJob;

const pageJob = async (job: Job<PageJobData>) => {
  switch (job.name) {
    case "createPage":
      return await pageRepository.create(job.data as CreatePageJob);

    case "updatePage": {
      const { pageId, updatedPage } = job.data as UpdatePageJob;

      return await pageRepository.update(pageId, updatedPage);
    }

    case "deletePage":
      return await pageRepository.deletePage(
        (job.data as DeletePageJob).pageId,
      );

    default:
      throw new Error(`Unknown page job: ${job.name}`);
  }
};

const createPageWorker = () =>
  new Worker<PageJobData>(queueConst.PAGE, pageJob, {
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
