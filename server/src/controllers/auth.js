const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const vcode = require('./../utls/vcode');

const errorBuilder = require('./../utls/error');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      errorBuilder({
        message: 'Validation Error',
        status: 422,
        errors: errors
          .array()
          .filter((x) => {
            return x.msg != 'Invalid value';
          })
          .map((x) => {
            return x.msg;
          }),
      })
    );
  }

  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 12);

    let username = email.split('@')[0];

    while (!!(await User.findOne({ username }))) {
      username += parseInt(Math.random() * 10);
    }

    const user = await User.create({
      ...req.body,
      password: hash,
      username,
      vcode: vcode(),
    });

    const token = jwt.sign(
      { id: user._id, state: user.state, role: user.role },
      'secret'
    );
    return res.status(201).json({
      message: 'Sign Up Successful',
      status: 201,
      token,
    });
  } catch (error) {
    console.log(error);
    return next(errorBuilder());
  }
};

exports.verifyToken = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new Error();
    }
    jwt.verify(req.body.token, 'secret');
    return res.status(200).json({
      message: 'Token valid',
      status: 200,
      valid: true,
    });
  } catch (error) {
    return res.status(200).json({
      message: 'Token invalid',
      status: 200,
      valid: false,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(
        errorBuilder({
          message: 'Incorrect Email or Password',
          status: 404,
          errors: ['Incorrect Email or Password'],
        })
      );
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(
        errorBuilder({
          message: 'Incorrect Email or Password',
          status: 404,
          errors: ['Incorrect Email or Password'],
        })
      );
    }
    const token = jwt.sign(
      { id: user._id, state: user.state, role: user.role },
      'secret'
    );
    if (user.state == 2) {
      return res.status(200).json({
        message: 'Please verify your email',
        status: 200,
        token,
      });
    }
    if (user.state == 1) {
      return res.status(200).json({
        message: 'Please complete your profile',
        status: 200,
        token,
      });
    }
    return res.status(200).json({
      message: 'Logged in successfully',
      status: 200,
      token,
    });
  } catch (error) {
    return next(errorBuilder());
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { vcode } = req.body;
    const errors = validationResult(req);
    if (req.user.vcode != vcode || !errors.isEmpty()) {
      return next(
        errorBuilder({
          message: 'Invalid verification code',
          status: 403,
          errors: ['Invalid verification code'],
        })
      );
    }
    const user = await User.updateOne(
      { _id: req.user._id },
      { $set: { state: 1 } }
    );
    const token = jwt.sign(
      { id: user._id, state: 1, role: user.role },
      'secret'
    );
    return res.status(200).json({
      message: 'Email verified !',
      status: 200,
      token,
    });
  } catch (error) {
    return next(errorBuilder());
  }
};
