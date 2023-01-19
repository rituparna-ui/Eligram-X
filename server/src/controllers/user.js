const errorBuilder = require('./../utls/error');
const User = require('./../models/user');

exports.getCurrentUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const fetchDetails = [
      'firstName',
      'lastName',
      'email',
      'username',
      'state',
      'role',
      'gender',
      '_id',
      'profilePicture',
      'dateOfBirth',
    ];
    const user = await User.findOne({ _id: id }).select(fetchDetails.join(' '));
    if (!user) {
      return next(
        errorBuilder({
          message: 'User not found',
          status: 404,
          errors: ['User not found'],
        })
      );
    }
    return res.status(200).json(user);
  } catch (error) {
    return next(errorBuilder());
  }
};

exports.getUserByUsername = async (req, res, next) => {
  const { username } = req.params;
  try {
    const fetchDetails = [
      'firstName',
      'lastName',
      'email',
      'username',
      'state',
      'role',
      'gender',
      '_id',
      'profilePicture',
      'dateOfBirth',
    ];
    const user = await User.findOne({ username }).select(
      fetchDetails.join(' ')
    );
    if (!user) {
      return next(
        errorBuilder({
          message: 'User not found',
          status: 404,
          errors: ['User not found'],
        })
      );
    }
    return res.status(200).json(user);
  } catch (error) {
    return next(errorBuilder());
  }
};
