import { createContext, useState, useCallback, useContext } from 'react';
import { useHistory } from 'react-router';
import { useToast } from '@chakra-ui/react';

import {
  fetchAuthUserPosts,
  createPost,
  likePost,
  fetchPostsByUserId,
  fetchPostFeed,
  fetchPost,
  postComment,
  deletPost,
  updatePost,
} from '../lib/api';
import alertOptions from '../lib/alert-options';
import { AuthContext } from './auth.context';

export const PostContext = createContext(null);

const PostContextProvider = ({ children }) => {
  const { authUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const history = useHistory();
  const toast = useToast();

  const loadAuthUserPosts = async () => {
    const res = await fetchAuthUserPosts();
    setPosts(res);
  };

  const addPost = async (postData) => {
    const newPost = await createPost(postData);
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
  };

  const handleDeletePost = async () => {
    await deletPost(post._id);
    history.push('/');
    toast(alertOptions.post_deleted);
  };

  const toggleLike = async (postId) => {
    const res = await likePost(postId);
    updatePosts(res);
  };

  const updatePosts = (updatedPost) => {
    const replaceIndex = posts.findIndex(
      (post) => post._id === updatedPost._id
    );
    const updatedPosts = [
      ...posts.slice(0, replaceIndex),
      updatedPost,
      ...posts.slice(replaceIndex + 1),
    ];
    setPosts(updatedPosts);
  };

  const handleUpdatePost = async (postData) => {
    const updatedPost = await updatePost(post._id, postData);
    setPost(updatedPost);
    toast(alertOptions.post_edited);
  };

  const getPostsByUserId = useCallback(async (userId) => {
    const posts = await fetchPostsByUserId(userId);
    setPosts(posts);
  }, []);

  const getPostFeed = useCallback(async (userId) => {
    const posts = await fetchPostFeed(userId);
    setPosts(posts);
  }, []);

  const getPost = useCallback(async (postId) => {
    const post = await fetchPost(postId);

    setPost(post);
  }, []);

  const addComment = async (text) => {
    const updatedPost = await postComment(post._id, text);
    setPost(updatedPost);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        loadAuthUserPosts,
        addPost,
        toggleLike,
        getPostsByUserId,
        setPosts,
        getPostFeed,
        getPost,
        setPost,
        post,
        addComment,
        handleDeletePost,
        handleUpdatePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
