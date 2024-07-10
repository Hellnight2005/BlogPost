const { log } = require("console");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const flieName = `${Date.now()}-${file.originalname}`;
    cb(null, flieName);
  },
});

const upload = multer({ storage: storage });

const handleAddNewBlog = async (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
};

const handleAddNewPostBlog = async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    CoverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
};

// controllers/blog.js
// controllers/blog.js
const handleBlogView = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  console.log("comment0", comments);
  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
};

const handleComment = async (req, res) => {
  console.log("req.user._id", req.user._id);
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
};

module.exports = {
  handleAddNewBlog,
  handleAddNewPostBlog,
  upload,
  handleBlogView,
  handleComment,
};
