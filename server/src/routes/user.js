const express = require('express');
const { getCurrentUser, getUserByUsername } = require('../controllers/user');
const router = express.Router();

router.get('/id/:id', getCurrentUser);

router.get('/u/:username', getUserByUsername);

module.exports = router;
