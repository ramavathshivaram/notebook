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
      localStorage.removeItem("current-page-storage");
      window.location.href = "/auth";
      toast.error("Session expired. Please log in again.");
    }
    toast.error("erroe occured");
    return Promise.reject(error);
  }
);

// USER API FETCHING
export const auth_api = async (formData) => {
  const res = await API.post("/auth", formData);
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const createSection = async (title) => {
  const res = await API.post("/create-section", { title });
  return res.data;
};

// Page
export const createPage = async (sectionId, title) => {
  const res = await API.post("/create-page", { sectionId, title });
  return res.data;
};

// Get Page
export const getSections = async () => {
  const res = await API.get(`/sections`);
  return res.data.section;
};
export const getPage = async (pageId) => {
  const res = await API.get(`/page/${pageId}`);
  return res.data.page;
};

// Update Page
export const updatePage = async (pageId, data) => {
  const res = await API.put(`/page/${pageId}`, data);
  return res.data;
};

export const renameSection = async (sectionId, title) => {
  const res = await API.patch(`/rename-sections/${sectionId}`, { title });
  return res.data.section;
};

export const deleteSection = async (sectionId) => {
  const res = await API.delete(`/sections/${sectionId}`);
  return res.data;
};
export const deletePage = async (sectionId, pageId) => {
  const res = await API.delete(`/pages/${sectionId}/${pageId}`);
  return res.data;
};
