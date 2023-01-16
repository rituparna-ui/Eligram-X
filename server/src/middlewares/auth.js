const jwt = require('jsonwebtoken');

const errorBuilder = require('./../utls/error');
const User = require('./../models/user');
const { getRedis } = require('../utls/db/redis');

module.exports = () => {
  return async (req, res, next) => {
    const token = req.headers?.authorization;
    try {
      const rToken = await getRedis().GET(token);
      if (!rtoken) {
        throw new Error();
      }
      const payload = jwt.verify(rToken, 'secret');
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
