import axios from 'axios';

const BASE_URL = 'http://localhost:8500/api';

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

// ********
// * AUTH *
// ********
export const signup = async (userInfo) => {
  const { data } = await axios.post(`${BASE_URL}/auth/signup`, userInfo);
  return data;
};

export const signin = async (userInfo) => {
  const { data } = await axios.post(`${BASE_URL}/auth/signin`, userInfo);

  return data;
};

export const fetchAuthUser = async () => {
  const { data } = await axios
    .get(`${BASE_URL}/users/current`)
    .catch((error) => {
      return error;
    });
  return data;
};

// *********
// * USERS *
// *********

export const fetchUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users`);
  return data;
};

export const fetchUserFeed = async (userId) => {
  const { data } = await axios.get(`${BASE_URL}/users/feed/${userId}`);
  return data;
};

export const fetchUserProfile = async (userId) => {
  const { data } = await axios.get(`${BASE_URL}/users/profile/${userId}`);
  return data;
};

export const searchUsers = async (query) => {
  const { data } = await axios.get(`${BASE_URL}/users/search/${query}`);
  return data;
};

export const followUser = async (followId) => {
  const { data } = await axios.put(`${BASE_URL}/users/follow`, followId);
  return data;
};

export const unFollowUser = async (unfollowId) => {
  const { data } = await axios.put(`${BASE_URL}/users/unfollow`, unfollowId);
  return data;
};

export const updateAvatar = async (image, userId) => {
  const { data } = await axios.put(
    `${BASE_URL}/users/update_avatar/${userId}`,
    image
  );
  return data;
};

export const updateProfile = async (profileData) => {
  const { data } = await axios.put(
    `${BASE_URL}/users/update_profile`,
    profileData
  );
  return data;
};

// *********
// * POSTS *
// *********
export const fetchPost = async (postId) => {
  const { data } = await axios.get(`${BASE_URL}/posts/${postId}`);
  return data;
};

export const createPost = async (postData) => {
  const { data } = await axios.post(`${BASE_URL}/posts/new`, postData);
  return data;
};

export const deletPost = async (postId) => {
  const { data } = await axios.delete(`${BASE_URL}/posts/${postId}`);
  return data;
};

export const fetchAuthUserPosts = async () => {
  const { data } = await axios.get(`${BASE_URL}/posts/my`);
  return data;
};

export const fetchPostsByUserId = async (userId) => {
  const { data } = await axios.get(`${BASE_URL}/posts/user/${userId}`);
  return data;
};

export const fetchPostFeed = async (userId) => {
  const { data } = await axios.get(`${BASE_URL}/posts/feed/${userId}`);
  return data;
};

export const updatePost = async (postId, postData) => {
  const { data } = await axios.put(`${BASE_URL}/posts/${postId}`, postData);
  return data;
};

export const likePost = async (postId) => {
  const { data } = await axios.put(`${BASE_URL}/posts/like/${postId}`);
  return data;
};

export const postComment = async (postId, text) => {
  const { data } = await axios.put(`${BASE_URL}/posts/comment/${postId}`, text);
  return data;
};
