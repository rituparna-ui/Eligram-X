const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    caption: { type: String, required: true },
    photos: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
      required: true,
      default: [],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
