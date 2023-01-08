const express = require('express');
const { body } = require('express-validator');

const { signup, login, verifyToken } = require('../controllers/auth');
const User = require('./../models/user');

const router = express.Router();

router.post(
  '/signup',
  [
    body('firstName')
      .isAlpha()
      .isLength({ min: 1 })
      .withMessage('Please enter a valid first name'),
    body('lastName')
      .isAlpha()
      .isLength({ min: 1 })
      .withMessage('Please enter a valid last name'),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .normalizeEmail()
      .custom((val, { req }) => {
        return User.findOne({ email: val }).then((user) => {
          if (user) {
            return Promise.reject('Email already in use');
          }
        });
      }),
    body('password')
      .isString()
      .withMessage('Please enter a valid password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('confirmPassword').custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  ],
  signup
);

router.post('/login', login);

router.post('/verify-token', body('token').isJWT(), verifyToken);

module.exports = router;
