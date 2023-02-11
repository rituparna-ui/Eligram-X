const jwt = require('jsonwebtoken');
const User = require('./../models/user');

module.exports = () => {
  return async (req, res, next) => {
    const token = req.headers?.authorization;
    if (!token) {
      return next();
    }
    try {
      const payload = jwt.verify(token, 'secret');
      const user = await User.findOneAndUpdate(
        { _id: payload.id },
        { $set: { lastSeen: Date.now() / 1000 } }
      );
      next();
    } catch (error) {
      console.log(error);
      next();
    }
  };
};
