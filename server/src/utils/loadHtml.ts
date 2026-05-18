import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import logger from "#configs/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadHtml = async (templatePath: string, data = {}): Promise<string> => {
  try {
    const fullPath: string = path.join(__dirname, templatePath);

    const html: string = await ejs.renderFile(fullPath, data, {
      async: true,
    });

    return html;
  } catch (error) {
    logger.error("Template render failed", error);
    throw error;
  }
};

export default loadHtml;