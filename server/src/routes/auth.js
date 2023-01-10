const express = require('express');
const { body } = require('express-validator');

const {
  signup,
  login,
  verifyToken,
  verifyEmail,
  completeProfile,
  googleLogin,
} = require('../controllers/auth');
const auth = require('../middlewares/auth');
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

router.post('/verify-email', body('vcode'), auth(), verifyEmail);

router.post(
  '/complete-profile',
  auth(),
  [
    body('gender').custom((val) => {
      if (val != 'male' && val != 'female') {
        throw new Error('Please provide a valid gender, male or female');
      }
      return true;
    }),
    body('dateOfBirth').custom((val) => {
      const arr = val.split('/');
      const month = +arr[0];
      const date = +arr[1];
      const year = arr[2];
      if (
        (date <= 0 && date > 31) ||
        (month <= 0 && month > 12) ||
        year.length != 4
      ) {
        throw new Error('Please enter a valid date');
      }
      return true;
    }),
  ],
  completeProfile
);

router.post('/google', googleLogin);

module.exports = router;
/*

,
*/
