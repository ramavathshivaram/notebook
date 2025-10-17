const express = require("express");
const router = express.Router();
const {
   createPage,
   getPage,
   updatePage,
   deletePage,
} = require("../controllers/pageController");


router.post("/create", createPage);

router.get("/:pageId", getPage);

router.put("/:pageId", updatePage);

router.delete("/:sectionId/:pageId", deletePage);

module.exports = router;