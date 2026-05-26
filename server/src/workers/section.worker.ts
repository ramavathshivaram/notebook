import { Job, Worker } from "bullmq";

import redis from "#configs/redis.js";

import { queueConst } from "#utils/const.js";

import sectionRepository from "#modules/section/section.repository.js";
import pageRepository from "#modules/page/page.repository.js";
import canvasRepository from "#modules/canvas/canvas.repository.js";

export interface ISection {
  _id: string;
  title: string;
  authId: string;
}

interface CreateSectionJob {
  title: string;
  authId: string;
}

interface RenameSectionJob {
  sectionId: string;
  title: string;
}

interface DeleteSectionJob {
  sectionId: string;
}

type SectionJobData = CreateSectionJob | RenameSectionJob | DeleteSectionJob;

const sectionJob = async (job: Job<SectionJobData>) => {
  switch (job.name) {
    case "createSection":
      return await sectionRepository.createSection(
        job.data as CreateSectionJob,
      );

    case "renameSection": {
      const { sectionId, title } = job.data as RenameSectionJob;

      return await sectionRepository.renameSection(sectionId, title);
    }

    case "deleteSection":
      const sectionId = (job.data as DeleteSectionJob).sectionId;
      await pageRepository.deleteAll(sectionId);
      await canvasRepository.deleteAll(sectionId);
      return await sectionRepository.deleteSection(sectionId);

    default:
      throw new Error(`Unknown section job: ${job.name}`);
  }
};

const createSectionWorker = () =>
  new Worker<SectionJobData>(queueConst.SECTION, sectionJob, {
    connection: redis,

    concurrency: 5,

    removeOnComplete: {
      count: 100,
    },

    removeOnFail: {
      count: 500,
    },
  });

export default createSectionWorker;
