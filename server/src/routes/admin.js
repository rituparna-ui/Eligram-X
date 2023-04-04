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

module.exports = router;
