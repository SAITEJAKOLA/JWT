const router = require('express').Router();
const publicposts = require('../model/PublicPosts');
const privateposts = require('../model/PrivatePosts');
const checkAuth = require('../middleware/checkAuth');

router.get('/publicPosts', async (req, res) => {
  try {
    const publicPosts = await publicposts.find();
    res.json(publicPosts);
  } catch (error) {
    res.status(400).json({
      success: false,
      Message: `Couldnt find the public posts due to ${error}`,
    });
  }
});

router.get('/privatePosts', checkAuth, async (req, res) => {
  try {
    const privatePosts = await privateposts.find();
    res.json({ sucess: true, posts: privatePosts });
  } catch (error) {
    res.status(400).json({
      success: false,
      Message: `Couldnt find the private posts due to ${error}`,
    });
  }
});

module.exports = router;
