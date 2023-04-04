const mongoose = require('mongoose');
const https = require('https');

const Post = require('./../models/post');
const User = require('./../models/user');
const Image = require('./../models/image');
const PostReport = require('./../models/postReport');
const errorBuilder = require('./../utls/error');

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
    await session.abortTransaction();
    return next(errorBuilder());
  } finally {
    session.endSession();
  }
};

exports.getAllPostsByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select('author');
    if (!user) {
      return next(
        errorBuilder({
          message: 'User not found',
          status: 404,
          errors: ['User not found'],
        })
      );
    }
    const posts = await Post.find({ author: user._id }).select(
      '-updatedAt -__v'
    );
    return res.json({
      message: 'Posts fetched',
      posts,
    });
  } catch (error) {
    return next(errorBuilder());
  }
};

exports.getImageById = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const image = await Image.findOne({ _id });
    if (!image) {
      return next(
        errorBuilder({
          message: 'Image not found',
          status: 404,
          errors: ['Image not found'],
        })
      );
    }
    https.get(image.url, (stream) => {
      stream.pipe(res);
    });
  } catch (error) {
    return next(errorBuilder());
  }
};

exports.getFeed = async (req, res, next) => {
  try {
    const posts = await Post.find().limit(20).exec();
    return res.json({
      message: 'Feed fetched',
      feed: posts,
    });
  } catch (error) {
    return next(errorBuilder());
  }
};

exports.postReport = async (req, res, next) => {
  try {
    const { post } = req.body;
    const report = await PostReport.findOne({
      reportedPost: post,
      reportedBy: req.user._id,
    });
    if (report) {
      return next(
        errorBuilder({
          message: 'Post already reported',
          errors: ['Post already reported'],
          status: 400,
        })
      );
    }
    await PostReport.create({
      reportedPost: post,
      reportedBy: req.user._id,
    });
    return res.json({
      message: 'Reported Successfully',
    });
  } catch (error) {
    return next(errorBuilder());
  }
};
