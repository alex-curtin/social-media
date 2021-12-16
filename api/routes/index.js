const express = require('express');

const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const router = express.Router();

const catchErrors = (fn) => (req, res, next) => {
  return fn(req, res, next).catch((error) => {
    console.error(error.message);
    res.status(500).send('Server error');
  });
};

// ***********
// auth routes
// ***********
router.post(
  '/api/auth/signup',
  authController.signupValidators,
  catchErrors(authController.validateSignup),
  catchErrors(authController.signup),
  catchErrors(authController.signin)
);

router.post(
  '/api/auth/signin',
  authController.signinValidators,
  catchErrors(authController.validateSignin),
  catchErrors(authController.signin)
);

// ***********
// user routes
// ***********
router.param('userId', userController.getUserById);

router.get(
  '/api/users/current',
  authController.checkAuth,
  catchErrors(userController.getAuthUser)
);

router.get(
  '/api/users',
  authController.checkAuth,
  catchErrors(userController.getUsers)
);

router.get(
  '/api/users/feed/:userId',
  authController.checkAuth,
  catchErrors(userController.getUserFeed)
);

router.get(
  '/api/users/profile/:userId',
  catchErrors(userController.getUserProfile)
);

router.get('/api/users/search/:query', catchErrors(userController.searchUsers));

router.put(
  '/api/users/update_avatar/:userId',
  authController.checkAuth,
  catchErrors(userController.updateAvatar)
);

router.put(
  '/api/users/update_profile',
  authController.checkAuth,
  catchErrors(userController.updateProfile)
);

router.put(
  '/api/users/follow',
  authController.checkAuth,
  catchErrors(userController.addFollowing),
  catchErrors(userController.addFollower)
);

router.put(
  '/api/users/unfollow',
  authController.checkAuth,
  catchErrors(userController.removeFollowing),
  catchErrors(userController.removeFollower)
);

// **********
// post routes
// **********
router.param('postId', postController.getPostById);

router.post(
  '/api/posts/new',
  authController.checkAuth,
  catchErrors(postController.addPost)
);

router.get(
  '/api/posts/my',
  authController.checkAuth,
  catchErrors(postController.getPostsByAuthUser)
);

router.get(
  '/api/posts/user/:userId',
  catchErrors(postController.getPostsByUser)
);

router.get('/api/posts/feed/:userId', catchErrors(postController.getPostFeed));

router.delete(
  '/api/posts/:postId',
  authController.checkAuth,
  postController.checkUserIsPoster,
  catchErrors(postController.deletePost)
);

router.put(
  '/api/posts/:postId',
  authController.checkAuth,
  postController.checkUserIsPoster,
  catchErrors(postController.updatePost)
);

router.put(
  '/api/posts/like/:postId',
  authController.checkAuth,
  catchErrors(postController.toggleLike)
);

router.put(
  '/api/posts/unlike/:postId',
  authController.checkAuth,
  catchErrors(postController.toggleLike)
);

router.put(
  '/api/posts/comment/:postId',
  authController.checkAuth,
  catchErrors(postController.comment)
);

router.put(
  '/api/posts/comments/delete/:postId',
  authController.checkAuth,
  catchErrors(postController.deleteComment)
);

router.get('/api/posts/:postId', catchErrors(postController.getPost));

// for testing purposes only
router.get('/api/images', catchErrors(userController.getImages));

module.exports = router;
