import axiosInstance from "#utils/axios.js";

const createPageApi = async (data: unknown) => {
  const response = await axiosInstance.post("/page", data);

  return response.data;
};

const updatePageApi = async (pageId: string, data: unknown) => {
  const response = await axiosInstance.patch(`/page/${pageId}`, data);

  return response.data;
};

const deletePageApi = async (pageId: string) => {
  const response = await axiosInstance.delete(`/page/${pageId}`);

  return response.data;
};

export default { createPageApi, updatePageApi, deletePageApi };
