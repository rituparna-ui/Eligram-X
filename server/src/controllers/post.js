const Post = require('./../models/post');
const Image = require('./../models/image');

const errorBuilder = require('./../utls/error');
const mongoose = require('mongoose');

exports.createPost = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const urls = req.files.map((x) => ({ url: x.publicUrl }));

    const images = await Image.insertMany(urls, { session });

    await Post.create(
      [
        {
          author: req.user._id,
          caption: req.body.caption,
          photos: images.map((image) => image._id),
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return res.json({
      message: 'Post created successfully',
      status: 201,
    });
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    return next(errorBuilder());
  } finally {
    session.endSession();
  }
};
