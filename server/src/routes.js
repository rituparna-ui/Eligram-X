const express = require('express');
const router = express.Router();

const adminGuard = require('./middlewares/admin');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const adminRoutes = require('./routes/admin');
const auth = require('./middlewares/auth');

router.use('/auth', authRoutes);

router.use('/users', userRoutes);

router.use('/posts', postRoutes);

router.use('/admin', auth(), adminGuard(), adminRoutes);

module.exports = router;
