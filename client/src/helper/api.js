import API from "./axios.js";

// -------------------- Auth APIs --------------------

export const loginApi = async (formData) => {
  const res = await API.post("/auth/login", formData);
  console.log(res.data);
  return res.data;
};

export const registerApi = async (formData) => {
  const res = await API.post("/auth/register", formData);
  return res.data;
};

export const logoutApi = async () => {
  const res = await API.post("/auth/logout");
  return res.data;
};

export const authCheckApi = async () => {
  const res = await API.get("/auth/check");
  return res.data;
};

export const refreshTokenApi = async () => {
  const res = await API.get("/auth/refresh");
  return res.data.token;
};

export const forgotPasswordApi = async (email) => {
  const res = await API.post("/auth/forgot", { email });
  return res.status >= 200 && res.status < 300;
};

export const verifyOTPApi = async ({ userId, otp }) => {
  const res = await API.post("/auth/verify-otp", { userId, otp });
  return res.status === 200;
};

export const resetPasswordApi = async ({ userId, password }) => {
  const res = await API.post("/auth/reset", { userId, password });
  return res.status === 200;
};

export const updateUser = async (darkMode) => {
  console.log(darkMode);
  const res = await API.post("/update-user", { darkMode });
  return res.data.user;
};

// -------------------- Section APIs --------------------
export const createSectionApi = async (title) => {
  const res = await API.post("section", { title });
  return res.data;
};

export const getSectionsApi = async () => {
  const res = await API.get("section/all");
  return res.data.data;
};

export const getSectionApi = async () => {
  const res = await API.get("section");
  return res.data.data;
};

export const renameSectionApi = async (sectionId, title) => {
  const res = await API.patch(`section/${sectionId}`, { title });
  return res.data.data;
};

export const deleteSectionApi = async (sectionId) => {
  const res = await API.delete(`section/${sectionId}`);
  return res.data;
};

// -------------------- Page APIs --------------------
export const createPage = async (page) => {
  const res = await API.post("page/create", page);
  return res.data;
};

export const getPage = async (pageId) => {
  const res = await API.get(`page/${pageId}`);
  return res.data.page;
};

export const updatePage = async (pageId, data) => {
  const res = await API.put(`page/${pageId}`, data);
  return res.data;
};

export const updatePageContent = async (pageId, data) => {
  const res = await API.patch(`page/content/${pageId}`, data);
  return res.data;
};

export const updatePageTitle = async (pageId, data) => {
  const res = await API.patch(`page/title/${pageId}`, data);
  return res.data;
};

export const deletePage = async (sectionId, pageId) => {
  const res = await API.delete(`page/${sectionId}/${pageId}`);
  return res.data;
};

// -------------------- Canvas APIs --------------------
export const createCanvas = async (canvas) => {
  const res = await API.post("canvas/create", canvas);
  return res.data.canvas;
};

export const getCanvas = async (canvasId) => {
  const res = await API.get(`canvas/${canvasId}`);
  return res.data.canvas;
};

export const updateCanvasTitle = async (canvasId, data) => {
  const res = await API.patch(`canvas/title/${canvasId}`, data);
  return res.data;
};

export const updateCanvasContent = async (canvasId, data) => {
  // console.log(canvasId,data)
  const res = await API.patch(`canvas/content/${canvasId}`, data);
  return res?.data?.canvas?.content;
};

export const deleteCanvas = async (sectionId, canvasId) => {
  const res = await API.delete(`canvas/${sectionId}/${canvasId}`);
  return res.data;
};

// -------------------- AI APIs --------------------
export const generateAiNote = async (data) => {
  const res = await API.post("/ai/generate-ai-note", data);
  return res.data.message;
};

export const generateCanvasDrawing = async (data) => {
  // console.log(data);
  const res = await API.post("/ai/generate-canvas-drawing", data);
  // console.log(res.data);
  // console.log("AI");
  return res.data.canvas;
};
