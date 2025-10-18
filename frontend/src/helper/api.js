import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_DEV_URL}/api`,
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
    // Handle 444 status code - session expired
    if (error.response && error.response.status === 444) {
      localStorage.removeItem("user-storage");
      localStorage.removeItem("token");
      const navigator = useNavigate();
      navigator("/auth");
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error(error.response.data.message || "An error occurred");
    }
    return Promise.reject(error);
  }
);

// USER API FETCHING
export const auth_api = async (formData) => {
  const res = await API.post("/auth", formData);
  localStorage.setItem("token", res.data.token);
  return res.data;
};

// ---------------- Forgot Password ----------------

// Send OTP -> returns true on success, throws on error
export const sendOTP = async (email) => {
  const res = await API.post("/forgot-password/send-otp", { email });
  return res.status === 200 || res.status === 201;
};

// Verify OTP -> returns true if OTP verified
export const verifyOTP = async ({ userId, otp }) => {
  console.log(userId, otp);
  const res = await API.post("/forgot-password/verify-otp", { userId, otp });
  // assume backend returns 200 if verified, 400 otherwise
  return res.status === 200;
};

// Reset Password -> returns true on success
export const resetPassword = async ({ userId, password }) => {
  console.log(userId, password);
  const res = await API.post("/forgot-password/reset", { userId, password });
  return res.status === 200;
};

//SECTION API
export const createSection = async (section) => {
  console.log("before", section);
  const res = await API.post("section/create", { ...section });
  console.log("after", res.data);
  return res.data;
};
export const getSections = async () => {
  const res = await API.get("section/");
  return res.data.section;
};

export const renameSection = async (sectionId, title) => {
  const res = await API.patch(`section/rename/${sectionId}`, { title });
  return res.data.section;
};

export const deleteSection = async (sectionId) => {
  const res = await API.delete(`section/${sectionId}`);
  console.log(res.data);
  return res.data;
};

// PAGE API
export const createPage = async (page) => {
  console.log("before", page);
  const res = await API.post("page/create", { ...page });
  console.log("after", res.data);
  return res.data;
};

// Get Page
export const getPage = async (pageId) => {
  const res = await API.get(`page/${pageId}`);
  return res.data.page;
};

// Update Page
export const updatePage = async (pageId, data) => {
  const res = await API.put(`page/${pageId}`, data);
  return res.data;
};

export const updatePageContent = async (pageId, data) => {
  console.log(pageId, data.content);
  const res = await API.patch(`page/content/${pageId}`, data);
  return res.data;
};

export const updatePageTitle = async (pageId, data) => {
  // console.log(pageId, data.title);
  const res = await API.patch(`page/title/${pageId}`, data);
  return res.data;
};

export const deletePage = async (sectionId, pageId) => {
  const res = await API.delete(`page/${sectionId}/${pageId}`);
  return res.data;
};

//AI
export const getAiResponse = async (data) => {
  const res = await API.post("/ai/create", data);
  return res.data.message;
};
