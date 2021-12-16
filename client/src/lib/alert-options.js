const defaults = {
  duration: 2000,
  isClosable: true,
};

const alertOptions = {
  server_error: {
    title: 'Server error',
    description: 'Please try again',
    status: 'error',
    ...defaults,
  },
  invalid_credentials: {
    title: 'Invalid credentials',
    status: 'error',
    ...defaults,
  },
  follow_user: {
    title: 'User followed',
    status: 'success',
    ...defaults,
  },
  unfollow_user: {
    title: 'User unfollowed',
    status: 'success',
    ...defaults,
  },
  signup_success: {
    title: 'Welcome Aboard!',
    description: 'Your account has been created',
    status: 'success',
    ...defaults,
  },
  post_deleted: {
    title: 'Post deleted',
    status: 'success',
    ...defaults,
  },
  post_edited: {
    title: 'Post edited',
    status: 'success',
    ...defaults,
  },
  changes_saved: {
    title: 'Changes saved',
    status: 'success',
    ...defaults,
  },
};

export default alertOptions;
