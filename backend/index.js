const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/mongo");
const {
  auth,
  createSection,
  createPage,
  getPage,
  updatePage,
  getSections,
  renameSection,
  deleteSection,
  deletePage,
} = require("./controllers/userControllers");
const protect = require("./middlewares/authMiddleware");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/auth", auth);

app.use(protect);

app.post("/create-section", createSection);

app.get("/sections", getSections);

app.delete("/sections/:sectionId", deleteSection);

app.patch("/rename-sections/:sectionId", renameSection);

app.post("/create-page", createPage);

app.get("/page/:pageId", getPage);

app.put("/page/:pageId", updatePage);

app.delete("/pages/:sectionId/:pageId", deletePage);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
