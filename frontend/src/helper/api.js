import axios from "axios";
import { toast } from "sonner";

const URL = "http://localhost:3000";

const API = axios.create({
  baseURL: URL,
});

// Interceptor to attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("user-storage");
      window.location.href = "/auth";
      toast.error("Session expired. Please log in again.");
    }
    return Promise.reject(error);
  }
);

// USER API FETCHING
export const auth_api = async (formData) => {
  console.log("🔑 Login request:", formData);
  const res = await API.post("/auth", formData);
  localStorage.setItem("token", res.data.token);
  console.log("✅ Login response:", res.data);
  return res.data;
};

export const createSection = async (title) => {
  const res = await API.post("/create-section", { title });
  console.log(res)
  return res.data;
};

// Page
export const createPage = async (sectionId, title) => {
  const res = await API.post("/create-page", { sectionId, title });
  console.log(res)
  return res.data;
};

// Get Page
export const getSections = async () => {
  const res = await API.get(`/sections`);
  console.log(res.data);
  return res.data.section;
};
export const getPage = async (pageId) => {
  const res = await API.get(`/page/${pageId}`);
  console.log("get-s",res)
  return res.data.page;
};

// Update Page
export const updatePage = async (pageId, data) => {
  const res = await API.put(`/page/${pageId}`, data);
  console.log(res)
  return res.data;
};

export const renameSection = async (sectionId, title) => {
  const res = await API.patch(`/rename-sections/${sectionId}`, { title });
  return res.data.section;
};
