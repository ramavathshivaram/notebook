import { Worker, Job, UnrecoverableError } from "bullmq";

import redis from "#configs/redis.js";
import logger from "#configs/logger.js";

import sendEmail from "#services/send-email.js";

import { queueConst } from "#utils/const.js";
import loadHtml from "#utils/loadHtml.js";

interface OtpEmailData {
  otp: string;
}

interface RegisterEmailData {
  userName: string;
  email: string;
}

interface EmailJobData {
  email: string;
  subject: string;
  data: OtpEmailData | RegisterEmailData;
}

const emailJob = async (job: Job<EmailJobData>) => {
  const { email, subject } = job.data;

  try {
    switch (job.name) {
      case "send-otp-email": {
        const { otp } = job.data.data as OtpEmailData;

        const html = await loadHtml("email.otp.ejs", { otp });

        return await sendEmail(email, subject, html);
      }
      case "send-register-email": {
        const { userName, email } = job.data.data as RegisterEmailData;
        const html = await loadHtml("email.register.ejs", {
          userName,
          email,
        });
        return await sendEmail(email, subject, html);
      }

      default:
        throw new UnrecoverableError(`Unknown email job type: ${job.name}`);
    }
  } catch (error: any) {
    const status = error?.response?.status;

    logger.error("Email job failed", {
      jobId: job.id,
      jobName: job.name,
      email,
      status,
      attemptsMade: job.attemptsMade,
      message: error?.message,
      stack: error?.stack,
    });

    if ([400, 401, 403, 404].includes(status)) {
      throw new UnrecoverableError(`Permanent email failure (${status})`);
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
