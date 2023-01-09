const jwt = require('jsonwebtoken');

const errorBuilder = require('./../utls/error');
const User = require('./../models/user');

module.exports = () => {
  return async (req, res, next) => {
    const token = req.headers?.authorization;
    try {
      const payload = jwt.verify(token, 'secret');
      const user = await User.findOne({ _id: payload.id });
      req.user = user;
      next();
    } catch (error) {
      return next(
        errorBuilder({
          message: 'Invalid token',
          status: 401,
          errors: ['Invalid token'],
        })
      );
    }
  };
};
