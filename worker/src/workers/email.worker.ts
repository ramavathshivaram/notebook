import { Worker, Job, UnrecoverableError } from "bullmq";

import redis from "#configs/redis.js";
import logger from "#configs/logger.js";

import sendEmail from "#services/send-email.js";

import { queueConst } from "#utils/const.js";

interface EmailJobData {
  email: string;
  subject: string;
  html: string;
}

const emailJob = async (job: Job<EmailJobData>) => {
  const { email, subject, html } = job.data;

  try {
    const messageId = await sendEmail(email, subject, html);

    return messageId;
  } catch (error: any) {
    const status = error?.response?.status;

    logger.error("❌ Email failed", {
      jobId: job.id,
      email,
      attemptsMade: job.attemptsMade,
      status,
      message: error?.message,
    });

    if (status === 400 || status === 401 || status === 403) {
      throw new UnrecoverableError(`Permanent email failure: ${status}`);
    }

    throw error;
  }
};

const createEmailWorker = () =>
  new Worker<EmailJobData>(queueConst.SEND_EMAIL, emailJob, {
    connection: redis,

    concurrency: 5,

    removeOnComplete: {
      count: 100,
    },

    removeOnFail: {
      count: 500,
    },
  });

export default createEmailWorker;
