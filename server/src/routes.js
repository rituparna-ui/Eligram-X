const express = require('express');
const router = express.Router();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

router.use('/auth', authRoutes);

router.use('/users', userRoutes);

router.use('/posts', postRoutes);

module.exports = router;
