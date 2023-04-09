const express = require('express');
const {
  getDashboard,
  getAllUsers,
  getOnlineUsers,
  getIdleUsers,
  getOfflineUsers,
  getBannedUsers,
  getAllAdmins,
  getAdminVerifiedUsers,
  getProfileCompleteUsers,
  getEmailVerifiedUsers,
  getUnverifiedUsers,
  getPostReports,
  dismissPostReport,
  deletePost,
  banUser,
  unbanUser,
  deleteUser,
  adminVerify,
  adminUnVerify,
  promoteUser,
  demoteUser,
} = require('../controllers/admin');
const router = express.Router();

router.get('/dashboard', getDashboard);

router.get('/users/all', getAllUsers);

router.get('/users/online', getOnlineUsers);

router.get('/users/idle', getIdleUsers);

router.get('/users/offline', getOfflineUsers);

router.get('/users/banned', getBannedUsers);

router.get('/users/admins', getAllAdmins);

router.get('/users/admin-verified', getAdminVerifiedUsers);

router.get('/users/complete', getProfileCompleteUsers);

router.get('/users/verified', getEmailVerifiedUsers);

router.get('/users/unverified', getUnverifiedUsers);

router.get('/reports/posts', getPostReports);

router.post('/reports/posts/dismiss', dismissPostReport);

router.post('/reports/posts/delete', deletePost);

router.post('/users/ban', banUser);

router.post('/users/unban', unbanUser);

router.post('/users/delete', deleteUser);

router.post('/users/admin-verify', adminVerify);

router.post('/users/admin-unverify', adminUnVerify);

router.post('/users/promote', promoteUser);

router.post('/users/demote', demoteUser);

module.exports = router;
