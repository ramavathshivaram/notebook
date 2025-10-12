const User = require("../models/userModel");
const Section = require("../models/sectionModel");
const Page = require("../models/pageModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

const auth = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check user exits
    let user = await User.findOne({ email });

    if (!user) {
      //add user if not exits
      await User.create({
        email,
        password,
      });
    }

    user = await User.findOne({ email }).populate({
      path: "sections",
      populate: { path: "pages", select: "-content" },
    });
    if (!(await user.matchPassword(password))) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", status: false, error: true });
    }
    const token = generateToken(user._id);

    res
      .status(200)
      .json({ token, user, message: "success", status: true, error: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSection = async (req, res) => {
  try {
    const userId = req.user.id; // authenticated user

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user);
    const section = await Section.create({
      title: req.body.title || "New Section",
      user: userId,
    });
    console.log("sec", section);

    user.sections.push(section._id);
    await user.save(); // save updated user

    res.status(201).json({ section, message: "Section created", status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSections = async (req, res) => {
  try {
    const userId = req.user.id; // authenticated user

    const user = await User.findById(userId).populate({
      path: "sections",
      populate: { path: "pages", select: "-content" },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({ section: user.sections, message: "", status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const renameSection = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { sectionId } = req.params;
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    // Find section and verify ownership
    const section = await Section.findOne({ _id: sectionId, user: userId });

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    section.title = title.trim();
    await section.save();

    res.status(200).json({
      section,
      message: "Section renamed successfully",
      status: true,
    });
  } catch (error) {
    console.error("Error renaming section:", error);
    res.status(500).json({ message: error.message });
  }
};

const createPage = async (req, res) => {
  try {
    const userId = req.user.id; // authenticated user
    const { sectionId, title } = req.body;

    if (!sectionId) {
      return res.status(400).json({ message: "Section ID is required" });
    }

    // Create new page
    const page = await Page.create({
      title: title || "New Page",
      user: userId,
      section: sectionId,
    });

    // Find section and add page
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    section.pages.push(page._id);
    await section.save();

    res.status(201).json({
      section,
      page,
      message: "Page created successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPage = async (req, res) => {
  try {
    const { pageId } = req.params;

    const page = await Page.findById(pageId);

    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    res.status(200).json({ page, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePage = async (req, res) => {
  try {
    const { pageId } = req.params;
    const { title, content } = req.body;

    const page = await Page.findById(pageId);
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    if (title) page.title = title;
    if (content) page.content = content;

    await page.save();

    res
      .status(200)
      .json({ page, message: "Page updated successfully", status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSection = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { sectionId } = req.params;
    const userId = req.user.id; // from auth middleware

    // 1️⃣ Check if section exists
    const section = await Section.findById(sectionId).session(session);
    if (!section) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Section not found" });
    }

    // 2️⃣ Verify ownership
    if (section.user.toString() !== userId) {
      await session.abortTransaction();
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this section" });
    }

    // 3️⃣ Remove section reference from User
    await User.findByIdAndUpdate(
      userId,
      { $pull: { sections: sectionId } },
      { session }
    );

    // 4️⃣ Delete related pages
    await Page.deleteMany({ section: sectionId }).session(session);

    // 5️⃣ Delete the section itself
    await Section.findByIdAndDelete(sectionId).session(session);

    // ✅ Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Section and related pages deleted successfully" });
  } catch (error) {
    console.error("❌ Transaction Error:", error);
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Server error while deleting section" });
  }
};

const deletePage = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { sectionId, pageId } = req.params;
    const userId = req.user.id; // from auth middleware

    // 1️⃣ Verify section exists and belongs to the user
    const section = await Section.findById(sectionId).session(session);
    if (!section) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Section not found" });
    }

    if (section.user.toString() !== userId) {
      await session.abortTransaction();
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this page" });
    }

    // 2️⃣ Remove page reference from the section
    await Section.findByIdAndUpdate(
      sectionId,
      { $pull: { pages: pageId } },
      { session }
    );

    // 3️⃣ Delete the page document
    await Page.findByIdAndDelete(pageId).session(session);

    // ✅ Commit if all succeeded
    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Page deleted successfully" });
  } catch (error) {
    console.error("❌ Transaction Error:", error);
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Server error while deleting page" });
  }
};

module.exports = {
  auth,
  createSection,
  createPage,
  getPage,
  updatePage,
  getSections,
  renameSection,
  deleteSection,
  deletePage,
};
