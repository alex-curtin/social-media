import { useContext, useEffect } from 'react';
import { Box, Heading } from '@chakra-ui/react';

import { UserContext } from '../../context/user.context';
import { PostContext } from '../../context/post.context';
import ProfileHeader from '../../components/profile-header/profile-header.component';
import PostFeed from '../../components/post-feed/post-feed.component';

const Profile = ({ match }) => {
  const { getUserProfile, userProfile } = useContext(UserContext);
  const { getPostsByUserId, setPosts } = useContext(PostContext);
  const { userId } = match.params;

  useEffect(() => {
    getUserProfile(userId);
    getPostsByUserId(userId);

    return () => {
      setPosts([]);
    };
  }, [getPostsByUserId, userId, getUserProfile, setPosts]);

  if (!userProfile) {
    return <Heading size='md'>loading...</Heading>;
  }

  return (
    <Box>
      <ProfileHeader userProfile={userProfile} />
      <PostFeed />
    </Box>
  );
};

export default Profile;
