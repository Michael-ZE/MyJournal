const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: new Date().toISOString().split("T")[0],
  },
});

module.exports = mongoose.model("blog", blogSchema);
