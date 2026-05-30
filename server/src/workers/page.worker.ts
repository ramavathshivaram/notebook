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
  _id: string;
  title?: string;
  content?: string;
  updatedAt: string;
  pageId: string;
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
      const data = job.data as UpdatePageJob;
      return await pageRepository.update(data.pageId, data);
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

    concurrency: 20,

    removeOnComplete: {
      age: 0,
    },
    removeOnFail: {
      count: 100,
    },
  });

export default createPageWorker;
