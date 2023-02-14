const errorBuilder = require('./../utls/error');

const User = require('./../models/user');
const PostReport = require('./../models/postReport');
const UserReport = require('./../models/userReport');

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

exports.getUsersByStatus = async (req, res, next) => {
  console.log(req.params);
};

exports.getUsersByType = async (req, res, next) => {};

exports.getUsersByProfile = async (req, res, next) => {};
