const express = require("express");
const router = express.Router();
const blogs = require("../controllers/blogs");

router.get("/", blogs.posts);

router.get("/new", blogs.new);

router.get("/:id", blogs.show);

router.get("/:id/edit", blogs.edit);

router.post("/", blogs.create);

router.patch("/:id", blogs.update);

router.delete("/:id", blogs.delete);

module.exports = router;
