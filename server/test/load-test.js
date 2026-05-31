import autocannon from "autocannon";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

const credentials = {
  email: "test@gmail.com",
  password: "12345678",
};

async function login() {
  const { data } = await axios.post(
    `${BASE_URL}/auth/login`,
    credentials,
  );

  return data.token;
}

async function createSection(token) {
  const { data } = await axios.post(
    `${BASE_URL}/section`,
    {
      title: `Section-${Date.now()}`,
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

  return data.page?._id ?? data.data?._id;
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

  return data.canvas?._id ?? data.data?._id;
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
  };
}

async function cleanup(resource) {
  await deletePage(resource.token, resource.pageId);
  await deleteCanvas(resource.token, resource.canvasId);
  await deleteSection(resource.token, resource.sectionId);
}

const resource = await setup();

console.log("Setup Complete");
console.table(resource);

const instance = autocannon({
  url: "http://localhost:8080",

  connections: 500,
  duration: 60,

  headers: {
    Authorization: `Bearer ${resource.token}`,
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
      path: `/api/page/${resource.pageId}`,
    },

    {
      method: "PATCH",
      path: `/api/page/${resource.pageId}`,
      headers: {
        Authorization: `Bearer ${resource.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: `Updated-${Date.now()}`,
      }),
    },

    {
      method: "GET",
      path: `/api/canvas/${resource.canvasId}`,
    },

    {
      method: "PATCH",
      path: `/api/canvas/${resource.canvasId}`,
      headers: {
        Authorization: `Bearer ${resource.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        data: [],
      }),
    },

    {
      method: "GET",
      path: `/api/message/all/${resource.pageId}?page=1&limit=20`,
    },
  ],
});

autocannon.track(instance);

instance.on("done", async (result) => {
  console.log("\n===== STATUS CODES =====");

  console.table(result.statusCodeStats);

  console.log("\n===== PERFORMANCE =====");

  console.table({
    "Requests/sec": result.requests.average.toFixed(2),
    "Latency Avg(ms)": result.latency.average.toFixed(2),
    "Latency P50(ms)": result.latency.p50.toFixed(2),
    "Latency P95(ms)": result.latency.p95.toFixed(2),
    "Latency P99(ms)": result.latency.p99.toFixed(2),
    "Throughput(bytes/sec)": result.throughput.average.toFixed(2),
    Errors: result.errors,
    Non2xx: result.non2xx,
  });

  await cleanup(resource);

  process.exit(0);
});