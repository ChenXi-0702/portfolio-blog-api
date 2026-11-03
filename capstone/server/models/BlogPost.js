const mongoose = require('mongoose');
const blogPostSchema = new mongoose.Schema({
  title: {
    type: String, required: true, trim: true, minlength: 3, maxlength: 120
  },
  content: {
    type: String, required: true, trim: true, maxlength: 10000
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true, collection: 'posts' });

module.exports = mongoose.model('BlogPost', blogPostSchema);
