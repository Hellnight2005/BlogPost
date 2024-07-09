const express = require("express");
const router = express.Router();
const {
  handleAddNewBlog,
  handleAddNewPostBlog,
  upload,
  handleBlogView,
  handleComment,
} = require("../controllers/blog");

router.get("/add-new", handleAddNewBlog);
router.post("/", upload.single("coverImage"), handleAddNewPostBlog);
router.get("/:id", handleBlogView);
router.post("/comment/:blogId", handleComment);
module.exports = router;
