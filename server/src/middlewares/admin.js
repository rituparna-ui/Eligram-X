const error = require('../utls/error');

module.exports = () => {
  return async (req, res, next) => {
    if (req?.user?.role != 'ADMIN') {
      return next(
        error({
          message: 'Unauthorized',
          status: 401,
          errors: ['Unauthorized'],
        })
      );
    } else {
      next();
    }
  };
};
