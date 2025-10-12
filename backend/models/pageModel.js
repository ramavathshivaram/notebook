const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  },
  { timestamps: true }
);

const Page = mongoose.model("Page", pageSchema);
module.exports = Page;
