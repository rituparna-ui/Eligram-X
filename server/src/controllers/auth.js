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

    const token = jwt.sign({ id: user._id, state: user.state }, 'secret');
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

exports.login = async (req, res, next) => {};
