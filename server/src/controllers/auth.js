const { validationResult } = require('express-validator');
const axios = require('axios').default;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const vcode = require('./../utls/vcode');
const { OAuth2Client } = require('google-auth-library');

const errorBuilder = require('./../utls/error');
const { getRedis } = require('../utls/db/redis');
const { default: mongoose } = require('mongoose');

const CLIENT_ID =
  '72244162417-815i1q0n7nh3i50n0c1c2tfv4taimvl9.apps.googleusercontent.com';

const client = new OAuth2Client(CLIENT_ID);

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
    return next(errorBuilder());
  }
};

exports.verifyToken = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new Error();
    }
    const payload = jwt.verify(req.body.token, 'secret');
    if (payload.state == 0) {
      const rToken = await getRedis().GET(req.body.token);
      if (!rToken) {
        throw new Error();
      }
    }
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
    const newSession = {
      ip: req.ip,
      browser: req.useragent.browser,
      version: req.useragent.version,
      os: req.useragent.os,
      platform: req.useragent.platform,
    };

    await getRedis().set(token, user._id.toString());

    const existingSessions = await getRedis().json.get(
      'user:sessions:' + user._id
    );

    if (!existingSessions) {
      await getRedis().json.SET('user:sessions:' + user._id, '.', {
        sessions: [{ [token]: newSession }],
      });
    } else {
      await getRedis().json.ARRAPPEND('user:sessions:' + user._id, 'sessions', {
        [token]: newSession,
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
    const user = await User.findOneAndUpdate(
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

exports.completeProfile = async (req, res, next) => {
  try {
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
    const arr = req.body.dateOfBirth.split('/');
    const month = +arr[0];
    const date = +arr[1];
    const year = +arr[2];

    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          gender: req.body.gender,
          'dateOfBirth.year': year,
          'dateOfBirth.month': month,
          'dateOfBirth.date': date,
          state: 0,
        },
      }
    );

    const token = jwt.sign(
      { id: user._id, state: 0, role: user.role },
      'secret'
    );
    const newSession = {
      ip: req.ip,
      browser: req.useragent.browser,
      version: req.useragent.version,
      os: req.useragent.os,
      platform: req.useragent.platform,
    };

    await getRedis().set(token, user._id.toString());

    const existingSessions = await getRedis().json.get(
      'user:sessions:' + user._id
    );

    if (!existingSessions) {
      await getRedis().json.SET('user:sessions:' + user._id, '.', {
        sessions: [{ [token]: newSession }],
      });
    } else {
      await getRedis().json.ARRAPPEND('user:sessions:' + user._id, 'sessions', {
        [token]: newSession,
      });
    }
    return res.status(200).json({
      message: 'Profile Completed !',
      status: 200,
      token,
    });
  } catch (error) {
    return next(errorBuilder());
  }
};

exports.googleLogin = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: idToken,
    });
    const payload = ticket.getPayload();

    const user = await User.findOne({ email: payload.email });
    if (user) {
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
      const newSession = {
        ip: req.ip,
        browser: req.useragent.browser,
        version: req.useragent.version,
        os: req.useragent.os,
        platform: req.useragent.platform,
      };

      await getRedis().set(token, user._id.toString());

      const existingSessions = await getRedis().json.get(
        'user:sessions:' + user._id
      );

      if (!existingSessions) {
        await getRedis().json.SET('user:sessions:' + user._id, '.', {
          sessions: [{ [token]: newSession }],
        });
      } else {
        await getRedis().json.ARRAPPEND(
          'user:sessions:' + user._id,
          'sessions',
          {
            [token]: newSession,
          }
        );
      }
      return res.status(200).json({
        message: 'Logged in successfully',
        status: 200,
        token,
      });
    } else {
      const email = payload.email;
      const password = 'qwer1234';
      const hash = await bcrypt.hash(password, 12);
      let username = email.split('@')[0];
      while (!!(await User.findOne({ username }))) {
        username += parseInt(Math.random() * 10);
      }

      const user = await User.create({
        firstName: payload.given_name,
        lastName: payload.family_name,
        email,
        password: hash,
        username,
        state: 1,
        vcode: vcode(),
      });

      const token = jwt.sign(
        { id: user._id, state: user.state, role: user.role },
        'secret'
      );
      return res.status(200).json({
        message: 'Logged in successfully',
        status: 200,
        token,
      });
    }
  } catch (error) {
    return next(
      errorBuilder({
        message: 'Invalid OAuth Token',
        status: 401,
        errors: ['Invalid OAuth Token'],
      })
    );
  }
};

exports.forgotPassword = async (req, res, next) => {
  const errors = validationResult(req);
  try {
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
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(
        errorBuilder({
          message: 'User not found',
          status: 404,
          errors: ['User not found'],
        })
      );
    }
    await User.updateOne(
      { _id: user.id },
      {
        $set: {
          passwordResetRequest: true,
          passwordResetCode: vcode(),
        },
      }
    );
    return res.status(200).json({
      message: 'Password reset code has been emailed',
      status: 200,
    });
  } catch (error) {
    return next(errorBuilder());
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { resetCode, password, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(
        errorBuilder({
          message: 'User not found',
          status: 404,
          errors: ['User not found'],
        })
      );
    }
    if (!user.passwordResetRequest) {
      return next(
        errorBuilder({
          message: 'Invalid Request',
          status: 401,
          errors: ['Invalid Request'],
        })
      );
    }
    if (user.passwordResetCode != resetCode) {
      return next(
        errorBuilder({
          message: 'Incorrect password reset code',
          status: 401,
          errors: ['Incorrect password reset code'],
        })
      );
    }
    const hash = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate(
      { email },
      {
        $set: {
          passwordResetRequest: false,
          password: hash,
        },
      }
    );
    const token = jwt.sign(
      { id: user._id, state: user.state, role: user.role },
      'secret'
    );
    return res.status(201).json({
      message: 'Password reset successful',
      status: 200,
      token,
    });
  } catch (error) {
    return next(errorBuilder());
  }
};

exports.logout = async (req, res, next) => {
  const token = req.headers?.authorization;
  const rToken = await getRedis().GET(token);
  if (!rToken) {
    return res.status(200).json({
      message: 'Logged Out',
    });
  }
  const payload = jwt.decode(token);
  const userSessions = await getRedis().json.GET('user:sessions:' + payload.id);
  newSessions = userSessions.sessions.filter((sessionToken) => {
    return Object.keys(sessionToken)[0] != token;
  });
  await getRedis().json.SET(
    'user:sessions:' + payload.id,
    'sessions',
    newSessions
  );
  await getRedis().DEL(token);
  return res.status(200).json({
    message: 'Logged Out',
  });
};

exports.connectDiscord = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const tokenResponseData = await axios
      .post(
        'https://discord.com/api/oauth2/token',
        new URLSearchParams({
          client_id: '1067374576994099200',
          client_secret: 'dzZzXdr7LXuJe5RtuXyKII-WoOvDYQ4V',
          code: req.body.code,
          grant_type: 'authorization_code',
          scope: 'identify guilds.join',
          redirect_uri: 'http://localhost:4200/auth/discord',
        }).toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      )
      .catch((e) => {
        throw e;
      });

    const userData = await axios.get('https://discordapp.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${tokenResponseData.data.access_token}`,
      },
    });
    const id = await getRedis().GET(req.body.token);
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          discord: {
            ...tokenResponseData.data,
            ...userData.data,
          },
        },
      },
      { new: true, session }
    );
    axios
      .put(
        'https://discordapp.com/api/guilds/956107989817917480/members/' +
          user.discord.id,
        {
          access_token: user.discord.access_token,
        },
        {
          headers: {
            Authorization:
              'Bot MTA2NzM3NDU3Njk5NDA5OTIwMA.G44H0_.UCn9KzTIWSffVyEzeOTkNltaA8bpBiYsQGs6EM',
            'Content-Type': 'application/json',
          },
        }
      )
      .then((result) => {
        return res.status(201).json({
          message: 'Discord Connected',
          status: 201,
          username: user.username,
        });
      })
      .catch((err) => {
        throw err;
      });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    return next(errorBuilder());
  } finally {
    session.endSession();
  }
};
