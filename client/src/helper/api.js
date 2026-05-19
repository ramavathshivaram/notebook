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
  console.log(res.data)
  return res.data.data;
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

export const renameSectionApi = async (sectionId, title) => {
  const res = await API.patch(`section/${sectionId}`, { title });
  return res.data.data;
};

export const deleteSectionApi = async (sectionId) => {
  const res = await API.delete(`section/${sectionId}`);
  return res.data;
};

// -------------------- Page APIs --------------------
export const createPageApi = async ({ title, sectionId }) => {
  const res = await API.post("page", { title, sectionId });
  return res.data;
};

export const getPageApi = async (pageId) => {
  const res = await API.get(`page/${pageId}`);
  return res.data.data;
};

export const getPagesApi = async (sectionId) => {
  const res = await API.get(`page/all/${sectionId}`);
  return res.data.data;
};

export const updatePageApi = async (pageId, data) => {
  const res = await API.patch(`page/${pageId}`, data);
  return res.data;
};

export const deletePageApi = async (pageId) => {
  const res = await API.delete(`page/${pageId}`);
  return res.data;
};

// -------------------- Canvas APIs --------------------
export const createCanvasApi = async ({ title, sectionId }) => {
  const res = await API.post("canvas", { title, sectionId });
  return res.data;
};

export const getCanvasApi = async (canvasId) => {
  const res = await API.get(`canvas/${canvasId}`);
  return res.data.data;
};

export const getCanvassApi = async (sectionId) => {
  const res = await API.get(`canvas/all/${sectionId}`);
  return res.data.data;
};

export const updateCanvasApi = async (canvasId, data) => {
  const res = await API.patch(`canvas/${canvasId}`, data);
  return res.data;
};

export const deleteCanvasApi = async (canvasId) => {
  const res = await API.delete(`canvas/${canvasId}`);
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
