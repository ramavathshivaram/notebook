import autocannon from "autocannon";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

const credentials = {
  email: "test@gmail.com",
  password: "12345678",
};

async function login() {
  const { data } = await axios.post(`${BASE_URL}/auth/login`, credentials);
  return data.token;
}

async function createSection(token) {
  const { data } = await axios.post(
    `${BASE_URL}/section`,
    {
      title: `LoadTest-${Date.now()}`,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data.section?._id ?? data.data?._id;
}

async function createPage(token, sectionId) {
  const { data } = await axios.post(
    `${BASE_URL}/page`,
    {
      title: `Page-${Date.now()}`,
      sectionId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data.data?._id ?? data.page?._id;
}

async function createCanvas(token, sectionId) {
  const { data } = await axios.post(
    `${BASE_URL}/canvas`,
    {
      title: `Canvas-${Date.now()}`,
      sectionId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data.data?._id ?? data.canvas?._id;
}

async function deletePage(token, pageId) {
  try {
    await axios.delete(`${BASE_URL}/page/${pageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {}
}

async function deleteCanvas(token, canvasId) {
  try {
    await axios.delete(`${BASE_URL}/canvas/${canvasId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {}
}

async function deleteSection(token, sectionId) {
  try {
    await axios.delete(`${BASE_URL}/section/${sectionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {}
}

async function setup() {
  const token = await login();

  const sectionId = await createSection(token);

  const pageId = await createPage(token, sectionId);

  const canvasId = await createCanvas(token, sectionId);

  return {
    token,
    sectionId,
    pageId,
    canvasId,
    resourceId: pageId,
  };
}

async function cleanup(resources) {
  await deletePage(resources.token, resources.pageId);
  await deleteCanvas(resources.token, resources.canvasId);
  await deleteSection(resources.token, resources.sectionId);
}

const resources = await setup();

console.log(resources);

const instance = autocannon({
  url: "http://localhost:8080",

  connections: 100,
  duration: 30,

  headers: {
    Authorization: `Bearer ${resources.token}`,
  },

  requests: [
    {
      method: "GET",
      path: "/api/auth/check",
    },

    {
      method: "GET",
      path: "/api/section/all",
    },

    {
      method: "GET",
      path: `/api/page/${resources.pageId}`,
    },

    {
      method: "PATCH",
      path: `/api/page/${resources.pageId}`,

      headers: {
        Authorization: `Bearer ${resources.token}`,
        "content-type": "application/json",
      },

      body: JSON.stringify({
        title: "Updated Page",
      }),
    },

    {
      method: "GET",
      path: `/api/canvas/${resources.canvasId}`,
    },

    {
      method: "PATCH",
      path: `/api/canvas/${resources.canvasId}`,

      headers: {
        Authorization: `Bearer ${resources.token}`,
        "content-type": "application/json",
      },

      body: JSON.stringify({
        data: [],
      }),
    },

    {
      method: "GET",
      path: `/api/message/all/${resources.resourceId}?page=1&limit=10`,
    },

    {
      method: "POST",
      path: "/api/ai/ask",

      headers: {
        Authorization: `Bearer ${resources.token}`,
        "content-type": "application/json",
      },

      body: JSON.stringify({
        message: "Explain Kafka partitions",
      }),
    },
  ],
});

autocannon.track(instance);

instance.on("done", async (result) => {
  console.table(result.statusCodeStats);

  console.log({
    requestsPerSec: result.requests.average,
    latency: result.latency.average,
    throughput: result.throughput.average,
    errors: result.errors,
    non2xx: result.non2xx,
  });

  await cleanup(resources);

  process.exit(0);
});
