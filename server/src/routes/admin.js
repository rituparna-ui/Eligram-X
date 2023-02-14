const express = require('express');
const { getDashboard, getUsersByFilter } = require('../controllers/admin');
const router = express.Router();

router.get('/dashboard', getDashboard);

router.post('/users', getUsersByFilter);

module.exports = router;
