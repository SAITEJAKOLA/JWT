const router = require("express").Router();
const { publicPosts, privatePosts } = require("../db");
const checkAuth = require("../middleware/checkAuth");

router.get("/publicPosts", async (req, res) => {
  res.json(publicPosts);
});

router.get("/privatePosts", checkAuth, async (req, res) => {
  res.json({ sucess: true, posts: privatePosts });
});

module.exports = router;