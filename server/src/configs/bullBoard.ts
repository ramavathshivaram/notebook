import { createBullBoard } from "@bull-board/api";

import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";

import { ExpressAdapter } from "@bull-board/express";

import {
  emailQueue,
  sectionQueue,
  pageQueue,
  messageQueue,
} from "#services/queues.js";

const serverAdapter = new ExpressAdapter();

serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [
    new BullMQAdapter(sectionQueue),
    new BullMQAdapter(pageQueue),
    new BullMQAdapter(messageQueue),
    new BullMQAdapter(emailQueue),
  ],
  serverAdapter,
});

export default serverAdapter;
