const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');

exports.list = async function (req, res) {
  const posts = await BlogPost.find().populate('author', 'username');
  res.json(posts);
};

exports.detail = async function (req, res, next) {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'username');
    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }
    const comments = await Comment.find({ post: post._id })
      .sort({ createdAt: 1 }).populate('author', 'username');
    res.json({
      _id: post._id, title: post.title, content: post.content,
      author: post.author, createdAt: post.createdAt,
      updatedAt: post.updatedAt, comments: comments
    });
  } catch (error) {
    next(error);
  }
};

exports.create = async function (req, res) {
  const data = req.body;
  if (!data || typeof data.title !== 'string' ||
      typeof data.content !== 'string') {
    return res.status(400).json({
      error: { message: 'Send a title and content as text.' }
    });
  }
  const post = await BlogPost.create({
    title: data.title, content: data.content,
    author: req.user._id.toString()
  });
  res.status(201).json(post);
};

exports.update = async function (req, res) {
  const data = req.body;
  if (!data || typeof data.title !== 'string' ||
      typeof data.content !== 'string') {
    return res.status(400).json({
      error: { message: 'Send a title and content as text.' }
    });
  }
  const post = await BlogPost.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ error: { message: 'Post not found' } });
  }
  if (!post.author || post.author.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('You can only update your own posts.');
  }
  post.title = data.title;
  post.content = data.content;
  await post.save();
  res.json(post);
};

exports.remove = async function (req, res) {
  const post = await BlogPost.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ error: { message: 'Post not found' } });
  }
  if (!post.author || post.author.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('You can only delete your own posts.');
  }
  // Deleting a post also removes its comments, as required by the capstone.
  await Comment.deleteMany({ post: post._id });
  await post.deleteOne();
  res.status(204).end();
};
