const blog = require("../models/blogs");

module.exports.index = async (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  let blogs;
  try {
    blogs = await blog.find({ date: today });
    res.render("index", {
      blogs,
      date: new Date().toLocaleString("en-US", {
        year: "numeric",
        day: "numeric",
        month: "short",
      }),
    });
  } catch {
    blogs = [];
  }
};
