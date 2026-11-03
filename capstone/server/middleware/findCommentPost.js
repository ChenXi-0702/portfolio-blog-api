const BlogPost = require('../models/BlogPost');

module.exports = async function (req, res, next) {
  try {
    req.post = await BlogPost.findById(req.params.postId);
    if (!req.post) {
      res.status(404);
      throw new Error('Post not found');
    }
    next();
  } catch (error) {
    next(error);
  }
};
