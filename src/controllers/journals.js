const blog = require("../models/blogs");

module.exports.posts = async (req, res) => {
  const search = { title: req.query.title, date: req.query.date };
  let query = blog.find({});
  if (req.query.title) {
    query = query.regex("title", new RegExp(req.query.title, "i"));
  }
  if (req.query.date) {
    query = query.where("date").equals(req.query.date);
  }
  try {
    const blogs = await query.sort({ date: -1 }).exec();

    res.render("blogs/index", { search, blogs });
  } catch {
    res.status(500);
    res.render("blogs/index", {
      search,
      blogs: [],
      errorMessage: "Can't Find!",
    });
  }
};

module.exports.new = (req, res) => {
  res.render("blogs/new", { blog: new blog() });
};

module.exports.create = async (req, res) => {
  const { title, post } = req.body;
  const newblog = new blog({
    title,
    post,
  });
  try {
    await newblog.save();
    res.redirect("/blogs");
  } catch {
    res.render("blogs/new", { blog: newblog, errorMessage: "Can't Post" });
  }
};

module.exports.show = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await blog.findById(id);
    res.render("blogs/show", { blog, url: `/blogs/${id}` });
  } catch {
    res.redirect("/blogs");
  }
};

module.exports.edit = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await blog.findById(id);
    res.render("blogs/edit", { blog });
  } catch {
    res.redirect(`/blogs/${id}`);
  }
};

module.exports.update = async (req, res) => {
  const id = req.params.id;
  const { title, post } = req.body;
  let blog;
  try {
    blog = await blog.findById(id);

    if (title === "" || post === "") {
      throw new Error("Title and post cannot be empty");
    }
    blog.title = title;
    blog.post = post;
    await blog.save();

    res.render(`blogs/show`, { blog, url: `/blogs/${id}` });
  } catch (e) {
    res.render("blogs/edit", { blog, errorMessage: e.message });
  }
};

module.exports.delete = async (req, res) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await blog.findById(id);
    await blog.remove();
    res.redirect("/blogs");
  } catch {
    if (!blog) {
      res.redirect("/");
    }
    res.render(`blogs/${id}`, { blog });
  }
};
