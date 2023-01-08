const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true, index: true },
    // 0-Complete   1-Email Verified, data tbd   2-Verify Email
    state: { type: Number, default: 2, enum: [0, 1, 2] },
    role: { type: String, default: 'USER', enum: ['USER', 'ADMIN', 'OWNER'] },
    vcode: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
