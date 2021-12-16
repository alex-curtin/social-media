const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    minlength: 4,
    maxlength: 10,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  about: {
    type: String,
  },
  avatar: {
    type: String,
    required: true,
    default: 'social_media/default_avatar_a42zjl',
  },
  following: [{ type: ObjectId, ref: 'User' }],
  followers: [{ type: ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('User', userSchema);
