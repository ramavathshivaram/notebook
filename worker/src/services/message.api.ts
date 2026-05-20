import axiosInstance from "#utils/axios.js";

const createMessageApi = async (data: unknown) => {
  const response = await axiosInstance.post("/message", data);
  return response.data;
};

export default { createMessageApi };
