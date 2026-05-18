import mongoose from "mongoose";
import env from "#configs/env.js";
import logger from "#configs/logger.js";

mongoose.connection.on("connected", () => {
  logger.info("Connected to MongoDB");
});

mongoose.connection.on("disconnected", () => {
  logger.info("Disconnected from MongoDB");
});

mongoose.connection.on("error", (error) => {
  logger.error("MongoDB connection error:", error);
});

const mongoOptions = {
  minPoolSize: 5,
  maxPoolSize: 10,

  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  heartbeatFrequencyMS: 10000,

  retryWrites: true,
};

const connectDB = async (retries: number = 5, delay: number = 5000): Promise<void> => {
  const MONGODB_URI = env.MONGODB_URI;

  try {
    await mongoose.connect(MONGODB_URI, mongoOptions);
  } catch (error) {
    if (retries === 0) {
      logger.error("No retries left. Exiting...");
      process.exit(1);
    }

    logger.warn(`Retrying MongoDB connection in ${delay / 1000}s...`);

    setTimeout(() => connectDB(retries - 1, delay), delay);
  }
};

export const disconnectDB = async () => await mongoose.disconnect();

export default connectDB;
