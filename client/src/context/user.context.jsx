import { createContext, useState, useContext, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';

import { AuthContext } from './auth.context';
import {
  fetchUsers,
  fetchUserProfile,
  fetchUserFeed,
  followUser,
  unFollowUser,
  updateAvatar,
  updateProfile,
  searchUsers,
} from '../lib/api';
import alertOptions from '../lib/alert-options';

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [userFeed, setUserFeed] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const toast = useToast();

  const getUsers = useCallback(async () => {
    const users = await fetchUsers();
    setUsers(users);
  }, []);

  const getUserProfile = useCallback(async (userId) => {
    const user = await fetchUserProfile(userId);
    setUserProfile(user);
  }, []);

  const getUserFeed = useCallback(async (userId) => {
    const userFeed = await fetchUserFeed(userId);

    setUserFeed(userFeed);
  }, []);

  const handleSearchUsers = useCallback(async (query) => {
    const users = await searchUsers(query);

    setUsers(users);
  }, []);

  const handleFollowUser = async (followId) => {
    const followedUser = await followUser({ followId });

    const updatedUser = { ...authUser };
    updatedUser.following.push(followId);

    setAuthUser(updatedUser);
    setUserProfile(followedUser);
    toast(alertOptions.follow_user);
  };

  const handleUnfollowUser = async (unfollowId) => {
    const unfollowedUser = await unFollowUser({ unfollowId });
    const updatedUser = { ...authUser };

    const removeIndex = updatedUser.following.findIndex(
      (item) => item === unfollowId
    );
    updatedUser.following.splice(removeIndex, 1);

    setAuthUser(updatedUser);
    setUserProfile(unfollowedUser);
    toast(alertOptions.unfollow_user);
  };

  const handleUpdateAvatar = async (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const res = await updateAvatar({ fileStr: reader.result }, authUser._id);
      setAuthUser(res);
      toast(alertOptions.changes_saved);
    };
  };

  const handleUpdateProifle = async (profileData) => {
    const updatedUser = await updateProfile(profileData);
    setAuthUser(updatedUser);
    toast(alertOptions.changes_saved);
  };

  return (
    <UserContext.Provider
      value={{
        getUsers,
        users,
        isLoading,
        setIsLoading,
        userFeed,
        getUserFeed,
        getUserProfile,
        userProfile,
        handleFollowUser,
        handleUnfollowUser,
        handleUpdateAvatar,
        handleUpdateProifle,
        handleSearchUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
