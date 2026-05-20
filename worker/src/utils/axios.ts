import env from "#configs/env.js";
import axios from "axios";

const baseUrl = env.SERVER_URL + "/internal";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export default axiosInstance;