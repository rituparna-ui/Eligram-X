const mongoose = require('mongoose');

const postReportModel = new mongoose.Schema({
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reportedPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
});

postReportModel.index({ reportedBy: 1, reportedPost: 1 }, { unique: true });

module.exports = mongoose.model('PostReport', postReportModel);
