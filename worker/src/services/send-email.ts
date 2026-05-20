import axios from "axios";
import logger from "#configs/logger.js";
import env from "#configs/env.js";

const brevoApi = axios.create({
  baseURL: "https://api.brevo.com/v3",
  headers: {
    "api-key": env.BREVO_API_KEY,
    "Content-Type": "application/json",
    accept: "application/json",
  },
  timeout: 10000,
});

interface EmailPayload {
  sender: {
    name: string;
    email: string;
  };
  to: { email: string }[];
  subject: string;
  htmlContent: string;
}

interface BrevoResponse {
  messageId: string;
}

const sendEmail = async (
  toEmail: string,
  subject: string,
  htmlContent: string,
): Promise<string> => {
  try {
    const payload: EmailPayload = {
      sender: {
        name: "Time Table",
        email: "ramavathshiva6300@gmail.com",
      },
      to: [{ email: toEmail }],
      subject,
      htmlContent,
    };

    const response = await brevoApi.post<BrevoResponse>("/smtp/email", payload);

    logger.info(`Email sent: ${response.data.messageId}`);

    return response.data.messageId;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errData = error.response?.data || error.message;
      logger.error("Brevo email error", errData);
    } else {
      logger.error("Unknown email error", error);
    }

    throw error;
  }
};

export default sendEmail;
