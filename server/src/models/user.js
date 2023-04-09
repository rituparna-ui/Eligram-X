const mongoose = require('mongoose');

const dateOfBirthSchema = new mongoose.Schema({
  date: { type: Number, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
});

const discordSchema = new mongoose.Schema({
  code: { type: String, required: true },
  access_token: { type: String, required: true },
  expires_in: { type: Number, required: true },
  refresh_token: { type: String, required: true },
  scope: { type: String, required: true },
  token_type: { type: String, required: true },
  id: { type: String, required: true },
  username: { type: String, required: true },
  avatar: { type: String, required: true },
  avatar_decoration: { type: String },
  discriminator: { type: String, required: true },
  locale: { type: String, required: true },
  email: { type: String, required: true },
  verified: { type: Boolean, required: true },
});

const speakeasySchema = new mongoose.Schema({
  ascii: { type: String, required: true },
  hex: { type: String, required: true },
  base32: { type: String, required: true },
  otpauth_url: { type: String, required: true },
});

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    // 0-Complete   1-Email Verified, data tbd   2-Verify Email
    state: { type: Number, default: 2, enum: [0, 1, 2] },
    role: { type: String, default: 'USER', enum: ['USER', 'ADMIN', 'OWNER'] },
    vcode: { type: Number, required: true },
    gender: {
      type: String,
      required: true,
      default: 'male',
      enum: ['male', 'female'],
    },
    dateOfBirth: {
      type: dateOfBirthSchema,
      required: true,
      default: {
        date: 1,
        month: 1,
        year: 1970,
      },
    },
    passwordResetRequest: { type: Boolean, default: false },
    passwordResetCode: { type: Number },
    profilePicture: {
      type: String,
      required: true,
      default:
        'https://storage.googleapis.com/rituparna-a.appspot.com/eligram%2Fassets%2Fphotos%2F1674025800920_user-default185c3b694d8.png',
    },
    discord: {
      type: discordSchema,
    },
    // online-less than 2 minutes | idle- 3 to 5 minutes | offline- 5+ minutes
    lastSeen: { type: Number, default: Date.now() / 1000, required: true },
    banned: { type: Boolean, default: false, required: true },
    adminVerified: { type: Boolean, default: false, required: true },
    is2FAEnabled: { type: Boolean, required: true, default: false },
    speakeasyDetails: {
      type: speakeasySchema,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
