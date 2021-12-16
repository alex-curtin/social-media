const mongoose = require('mongoose');

const cloudinary = require('../utils/cloudinary');
const User = mongoose.model('User');

exports.getAuthUser = async (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const user = await User.findOne({ _id: req.user.id });

  res.json(user);
};

exports.getUserById = async (req, res, next, id) => {
  const user = await User.findOne({ _id: id });
  req.profile = user;
  next();
};

exports.getUsers = async (req, res) => {
  const users = await User.find({ _id: { $not: { $eq: req.user.id } } }).select(
    '_id name avatar email createdAt updatedAt'
  );
  res.json(users);
};

exports.searchUsers = async (req, res) => {
  const { query } = req.params;
  const regex = new RegExp(`.*${query}.*`, 'i');
  const users = await User.find({ name: regex });

  res.json(users);
};

exports.getUserFeed = async (req, res) => {
  const { following, _id } = req.profile;
  const users = await User.find({ _id: { $in: following } }).select(
    '_id name avatar'
  );

  res.json(users);
};

exports.getUserProfile = async (req, res) => {
  if (!req.profile) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(req.profile);
};

exports.updateProfile = async (req, res) => {
  const { id } = req.user;

  const updatedUser = await User.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  res.json(updatedUser);
};

exports.updateAvatar = async (req, res) => {
  if (!req.profile) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { fileStr } = req.body;
  const user = req.profile;

  const response = await cloudinary.uploader.upload(fileStr, {
    upload_preset: 'social_media',
  });

  user.avatar = response.public_id;
  await user.save();
  res.json(user);
};

exports.addFollowing = async (req, res, next) => {
  const { followId } = req.body;

  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    { $push: { following: followId } }
  );

  next();
};

exports.addFollower = async (req, res) => {
  const { followId } = req.body;

  const user = await User.findOneAndUpdate(
    { _id: followId },
    { $push: { followers: req.user.id } },
    { new: true }
  );

  res.json(user);
};

exports.removeFollowing = async (req, res, next) => {
  const { unfollowId } = req.body;

  await User.findOneAndUpdate(
    { _id: req.user.id },
    { $pull: { following: unfollowId } }
  );
  next();
};

exports.removeFollower = async (req, res) => {
  const { unfollowId } = req.body;
  console.log(unfollowId);
  const user = await User.findOneAndUpdate(
    { _id: unfollowId },
    { $pull: { followers: req.user.id } },
    { new: true }
  );

  res.json(user);
};

// for testing purposes only
exports.getImages = async (req, res) => {
  const response = await cloudinary.search
    .expression('folder:social_media')
    .execute();
  res.json(response);
};
