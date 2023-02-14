const express = require('express');
const { getDashboard, getAllUsers } = require('../controllers/admin');
const router = express.Router();

router.get('/dashboard', getDashboard);

router.get('/users', getAllUsers);

router.post('/users/status/:status');

router.post('/users/users/:type');

router.post('/users/profiles/:profile');

module.exports = router;
