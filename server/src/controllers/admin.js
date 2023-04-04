const errorBuilder = require('./../utls/error');

const User = require('./../models/user');
const Post = require('./../models/post');
const PostReport = require('./../models/postReport');
const UserReport = require('./../models/userReport');
const mongoose = require('mongoose');

exports.getDashboard = async (req, res, next) => {
  try {
    const now = Date.now() / 1000;
    const pOnlineUsers = User.find({ lastSeen: { $gt: now - 180 } }).count();
    const pIdleUsers = User.find({
      lastSeen: { $lt: now - 180, $gte: now - 300 },
    }).count();
    const pOfflineUsers = User.find({ lastSeen: { $lt: now - 300 } }).count();

    const pAllUsers = User.find({}).count();
    const pBannedUsers = User.find({ banned: true }).count();
    const pAdminVerifiedUsers = User.find({ adminVerified: true }).count();
    const pAdminUsers = User.find({ role: 'ADMIN' }).count();

    const pEmailUnverified = User.find({ state: 2 }).count();
    const pEmailVerified = User.find({ state: 1 }).count();
    const pCompleteProfile = User.find({ state: 0 }).count();

    const pPostReports = PostReport.find().count();
    const pUserReports = UserReport.find().count();

    const [
      onlineUsers,
      idleUsers,
      offlineUsers,
      allUsers,
      bannedUsers,
      adminVerifiedUsers,
      adminUsers,
      emailUnverified,
      emailVerified,
      completeProfile,
      postReports,
      userReports,
    ] = await Promise.all([
      pOnlineUsers,
      pIdleUsers,
      pOfflineUsers,
      pAllUsers,
      pBannedUsers,
      pAdminVerifiedUsers,
      pAdminUsers,
      pEmailUnverified,
      pEmailVerified,
      pCompleteProfile,
      pPostReports,
      pUserReports,
    ]);

    return res.status(201).json({
      message: 'Data Fetched Successfully',
      data: {
        status: { onlineUsers, idleUsers, offlineUsers },
        users: { allUsers, bannedUsers, adminVerifiedUsers, adminUsers },
        profiles: { emailUnverified, emailVerified, completeProfile },
        reports: { postReports, userReports },
      },
    });
  } catch (error) {
    next(errorBuilder());
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const data = [
      'firstName',
      'lastName',
      'email',
      'username',
      'state',
      'role',
      'lastSeen',
      'banned',
      'adminVerified',
    ];
    const currentPage = +req.query.page + 1 || 0;
    const totalCount = await User.countDocuments();
    const users = await User.find()
      .select(data.join(' '))
      .skip(20 * (currentPage - 1))
      .limit(20)
      .lean();
    return res.json({
      message: 'Users Fetched',
      totalCount,
      users,
    });
  } catch (error) {
    return next(errorBuilder());
  }
};

exports.getOnlineUsers = async (req, res, next) => {
  try {
    const now = Date.now() / 1000;
    const data = [
      'firstName',
      'lastName',
      'email',
      'username',
      'state',
      'role',
      'lastSeen',
      'banned',
      'adminVerified',
    ];
    const currentPage = +req.query.page + 1 || 0;
    const totalCount = await User.countDocuments({
      lastSeen: { $gt: now - 180 },
    });
    const users = await User.find({ lastSeen: { $gt: now - 180 } })
      .select(data.join(' '))
      .skip(20 * (currentPage - 1))
      .limit(20)
      .lean();
    return res.json({
      message: 'Users Fetched',
      totalCount,
      users,
    });
  } catch (error) {
    return next(errorBuilder());
  }
};

exports.getIdleUsers = async (req, res, next) => {
  try {
    const now = Date.now() / 1000;
    const data = [
      'firstName',
      'lastName',
      'email',
      'username',
      'state',
      'role',
      'lastSeen',
      'banned',
      'adminVerified',
    ];
    const currentPage = +req.query.page + 1 || 0;
    const totalCount = await User.countDocuments({
      lastSeen: { $lt: now - 180, $gte: now - 300 },
    });
    const users = await User.find({
      lastSeen: { $lt: now - 180, $gte: now - 300 },
    })
      .select(data.join(' '))
      .skip(20 * (currentPage - 1))
      .limit(20)
      .lean();
    return res.json({
      message: 'Users Fetched',
      totalCount,
      users,
    });
  } catch (error) {
    return next(errorBuilder());
  }
};

exports.getOfflineUsers = async (req, res, next) => {
  try {
    const now = Date.now() / 1000;
    const data = [
      'firstName',
      'lastName',
      'email',
      'username',
      'state',
      'role',
      'lastSeen',
      'banned',
      'adminVerified',
    ];
    const currentPage = +req.query.page + 1 || 0;
    const totalCount = await User.countDocuments({
      lastSeen: { $lt: now - 300 },
    });
    const users = await User.find({ lastSeen: { $lt: now - 300 } })
      .select(data.join(' '))
      .skip(20 * (currentPage - 1))
      .limit(20)
      .lean();
    return res.json({
      message: 'Users Fetched',
      totalCount,
      users,
    });
  } catch (error) {
    return next(errorBuilder());
  }
};

exports.getBannedUsers = async (req, res, next) => {
  try {
    const data = [
      'firstName',
      'lastName',
      'email',
      'username',
      'state',
      'role',
      'lastSeen',
      'banned',
      'adminVerified',
    ];
    const currentPage = +req.query.page + 1 || 0;
    const totalCount = await User.countDocuments({
      banned: true,
    });
    const users = await User.find({
      banned: true,
    })
      .select(data.join(' '))
      .skip(20 * (currentPage - 1))
      .limit(20)
      .lean();
    return res.json({
      message: 'Users Fetched',
      totalCount,
      users,
    });
  } catch (error) {
    return next(errorBuilder());
  }
};

exports.getAllAdmins = async (req, res, next) => {
  try {
    const data = [
      'firstName',
      'lastName',
      'email',
      'username',
      'state',
      'role',
      'lastSeen',
      'banned',
      'adminVerified',
    ];
    const currentPage = +req.query.page + 1 || 0;
    const totalCount = await User.countDocuments({
      role: 'ADMIN',
    });
    const users = await User.find({
      role: 'ADMIN',
    })
      .select(data.join(' '))
      .skip(20 * (currentPage - 1))
      .limit(20)
      .lean();
    return res.json({
      message: 'Users Fetched',
      totalCount,
      users,
    });
  } catch (error) {
    return next(errorBuilder());
  }
};

exports.getAdminVerifiedUsers = async (req, res, next) => {
  try {
    const data = [
      'firstName',
      'lastName',
      'email',
      'username',
      'state',
      'role',
      'lastSeen',
      'banned',
      'adminVerified',
    ];
    const currentPage = +req.query.page + 1 || 0;
    const totalCount = await User.countDocuments({
      adminVerified: true,
    });
    const users = await User.find({
      adminVerified: true,
    })
      .select(data.join(' '))
      .skip(20 * (currentPage - 1))
      .limit(20)
      .lean();
    return res.json({
      message: 'Users Fetched',
      totalCount,
      users,
    });
  } catch (error) {
    return next(errorBuilder());
  }
};

exports.getProfileCompleteUsers = async (req, res, next) => {
  try {
    const data = [
      'firstName',
      'lastName',
      'email',
      'username',
      'state',
      'role',
      'lastSeen',
      'banned',
      'adminVerified',
    ];
    const currentPage = +req.query.page + 1 || 0;
    const totalCount = await User.countDocuments({
      state: 0,
    });
    const users = await User.find({
      state: 0,
    })
      .select(data.join(' '))
      .skip(20 * (currentPage - 1))
      .limit(20)
      .lean();
    return res.json({
      message: 'Users Fetched',
      totalCount,
      users,
    });
  } catch (error) {
    return next(errorBuilder());
  }
};

exports.getEmailVerifiedUsers = async (req, res, next) => {
  try {
    const data = [
      'firstName',
      'lastName',
      'email',
      'username',
      'state',
      'role',
      'lastSeen',
      'banned',
      'adminVerified',
    ];
    const currentPage = +req.query.page + 1 || 0;
    const totalCount = await User.countDocuments({
      state: 1,
    });
    const users = await User.find({
      state: 1,
    })
      .select(data.join(' '))
      .skip(20 * (currentPage - 1))
      .limit(20)
      .lean();
    return res.json({
      message: 'Users Fetched',
      totalCount,
      users,
    });
  } catch (error) {
    return next(errorBuilder());
  }
};

exports.getUnverifiedUsers = async (req, res, next) => {
  try {
    const data = [
      'firstName',
      'lastName',
      'email',
      'username',
      'state',
      'role',
      'lastSeen',
      'banned',
      'adminVerified',
    ];
    const currentPage = +req.query.page + 1 || 0;
    const totalCount = await User.countDocuments({
      state: 2,
    });
    const users = await User.find({
      state: 2,
    })
      .select(data.join(' '))
      .skip(20 * (currentPage - 1))
      .limit(20)
      .lean();
    return res.json({
      message: 'Users Fetched',
      totalCount,
      users,
    });
  } catch (error) {
    return next(errorBuilder());
  }
};

exports.getPostReports = async (req, res, next) => {
  try {
    const reports = await PostReport.aggregate([
      {
        $lookup: {
          from: 'posts',
          localField: 'reportedPost',
          foreignField: '_id',
          as: 'post',
        },
      },
      {
        $project: {
          post: { $first: '$post' },
          reportedBy: 1,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'reportedBy',
          foreignField: '_id',
          as: 'reportedBy',
        },
      },
      {
        $project: {
          reportedBy: { $first: '$reportedBy' },
          post: 1,
          author: '$post.author',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author',
        },
      },
      {
        $project: {
          author: { $first: '$author' },
          post: 1,
          reportedBy: 1,
        },
      },
      {
        $project: {
          post: 1,
          author: {
            _id: '$author._id',
            name: { $concat: ['$author.firstName', ' ', '$author.lastName'] },
            role: '$author.role',
            username: '$author.username',
          },
          reportedBy: {
            _id: '$reportedBy._id',
            name: {
              $concat: ['$reportedBy.firstName', ' ', '$reportedBy.lastName'],
            },
            role: '$reportedBy.role',
            username: '$reportedBy.username',
          },
        },
      },
    ]);
    return res.json({
      message: 'Post Reports fetched',
      reports,
    });
  } catch (error) {
    console.log(error);
    return next(errorBuilder());
  }
};

exports.dismissPostReport = async (req, res, next) => {
  try {
    const { postId } = req.body;
    await PostReport.deleteMany({ reportedPost: postId });
    return res.json({
      message: 'All Reports related to this post dismissed',
    });
  } catch (error) {
    return next(errorBuilder());
  }
};

exports.banUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    await User.updateOne({ _id: userId }, { $set: { banned: true } });
    return res.json({
      message: 'User Banned',
    });
  } catch (error) {
    return next(errorBuilder());
  }
};

exports.deletePost = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { postId } = req.body;
    await Post.deleteOne({ _id: postId }, { session });
    await PostReport.deleteMany({ reportedPost: postId }, { session });
    await session.commitTransaction();
    return res.json({
      message: 'Post Deleted',
    });
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    return next(errorBuilder());
  } finally {
    session.endSession();
  }
};
