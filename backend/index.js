const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/mongo");
const {
  auth,
  sendOTP,
  verifyOTP,
  resetPassword,
} = require("./controllers/userControllers");
const protect = require("./middlewares/authMiddleware");
const section_routes = require("./routes/sectionRoutes");
const page_routes = require("./routes/pageRoutes");
const ai_routes = require("./routes/aiRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");

app.set("views", "./views");

app.post("/api/auth", auth);
app.post("/api/forgot-password/send-otp", sendOTP);
app.post("/api/forgot-password/verify-otp", verifyOTP);
app.post("/api/forgot-password/reset", resetPassword);

app.use(protect);

app.use("/api/section", section_routes);
app.use("/api/page", page_routes);
app.use("/api/ai", ai_routes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to connect to DB", error);
  }
};

startServer();
