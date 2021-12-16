const mongoose = require('mongoose');

const Post = mongoose.model('Post');

exports.addPost = async (req, res) => {
  console.log(req.user);
  req.body.postedBy = req.user.id;
  const post = await new Post(req.body).save();
  await Post.populate(post, {
    path: 'postedBy',
    select: '_id name avatar',
  });
  res.json(post);
};

exports.getPostById = async (req, res, next, id) => {
  const post = await Post.findOne({ _id: id });
  req.post = post;
  next();
};

exports.getPost = async (req, res) => {
  const post = req.post;

  if (!post) {
    return res.json('Post not found');
  }

  res.json(post);
};

exports.getPostsByUser = async (req, res) => {
  const posts = await Post.find({ postedBy: req.profile._id }).sort({
    createdAt: 'desc',
  });
  res.json(posts);
};

exports.getPostFeed = async (req, res) => {
  const { following, _id } = req.profile;

  following.push(_id);
  const posts = await Post.find({ postedBy: { $in: following } }).sort({
    createdAt: 'desc',
  });

  res.json(posts);
};

exports.getPostsByAuthUser = async (req, res) => {
  const posts = await Post.find({ postedBy: req.user.id }).sort({
    createdAt: 'desc',
  });
  res.json(posts);
};

exports.checkUserIsPoster = (req, res, next) => {
  const posterId = req.post.postedBy._id.toString();
  req.isPoster = posterId === req.user.id;
  next();
};

exports.deletePost = async (req, res) => {
  const { _id } = req.post;

  if (!req.isPoster) {
    return res
      .status(400)
      .json({ message: 'You are not authorized to perform this action.' });
  }

  const deletedPost = await Post.findOneAndDelete({ _id });
  res.json(deletedPost);
};

exports.updatePost = async (req, res) => {
  const { _id } = req.post;

  if (!req.isPoster) {
    return res
      .status(400)
      .json({ message: 'You are not authorized to perform this action.' });
  }

  const updatedPost = await Post.findOneAndUpdate({ _id }, req.body, {
    new: true,
  }).populate('postedBy', 'name _id avatar');

  res.json(updatedPost);
};

exports.toggleLike = async (req, res) => {
  const postId = req.post._id;
  const userId = req.user.id;

  const post = req.post;
  const likeIds = post.likes.map((id) => id.toString());
  if (likeIds.includes(userId)) {
    await post.likes.pull(userId);
  } else {
    await post.likes.push(userId);
  }

  await post.save();
  res.json(post);
};

exports.comment = async (req, res) => {
  const data = { text: req.body.text, postedBy: req.user.id };
  const post = req.post;

  post.comments.push(data);
  post.populate('comments.postedBy', '_id name avatar');
  await post.save();

  res.json(post);
};

exports.deleteComment = async (req, res) => {
  const userId = req.user.id;
  const { commentId } = req.body;
  const post = req.post;

  // check if user is poster of comment
  const comment = post.comments.find((el) => el._id.toString() === commentId);
  if (comment.postedBy._id.toString() !== userId) {
    return res
      .status(400)
      .json({ message: 'You are not authorized to perform this action.' });
  }

  // find and delete comment
  const deleteIndex = post.comments.findIndex(
    (el) => el._id.toString() === commentId
  );
  post.comments.splice(deleteIndex, 1);
  await post.save();

  res.json(post);
};
