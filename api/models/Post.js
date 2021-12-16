const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    likes: [{ type: ObjectId, ref: 'User' }],
    comments: [
      {
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
        postedBy: { type: ObjectId, ref: 'User' },
      },
    ],
    postedBy: {
      type: ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { autoIndex: false }
);

const autoPopulatePostedBy = function (next) {
  this.populate('postedBy', '_id name avatar');
  this.populate('comments.postedBy', '_id name avatar');
  next();
};

postSchema
  .pre('findOne', autoPopulatePostedBy)
  .pre('find', autoPopulatePostedBy);

postSchema.index({ postedBy: 1, createdAt: 1 });

module.exports = mongoose.model('Post', postSchema);
