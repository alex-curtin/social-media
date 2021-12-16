import { useContext } from 'react';
import { Flex, Heading, Stack, Box, Text } from '@chakra-ui/react';

import { AuthContext } from '../../context/auth.context';
import FollowButton from '../follow-button/follow-button.component';
import Avatar from '../avatar/avatar.component';

const ProfileHeader = ({ userProfile }) => {
  const { authUser } = useContext(AuthContext);
  const isFollower = authUser.followers.includes(userProfile._id);

  return (
    <Box borderRadius='md' overflow='hidden' bg='white' boxShadow='xl'>
      <Flex alignItems='flex-end' justify='space-between' bg='teal.200' p={4}>
        <Stack direction='row' alignItems='center' spacing={4}>
          <Avatar publicId={userProfile.avatar} size='large' />
          <Heading size='lg'>{userProfile.name}</Heading>
        </Stack>
        {authUser && authUser._id !== userProfile._id && <FollowButton />}
      </Flex>
      {userProfile.about && (
        <Box p={4}>
          <Text>{userProfile.about}</Text>
        </Box>
      )}
      {isFollower && (
        <Heading px={4} mt={4} size='sm'>
          Follows you
        </Heading>
      )}
      <Stack direction='row' p={4}>
        <Heading size='xs'>followers: {userProfile.followers.length}</Heading>
        <Heading size='xs'>following: {userProfile.following.length}</Heading>
      </Stack>
    </Box>
  );
};

export default ProfileHeader;
