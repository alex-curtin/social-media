import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Box, Heading, Button, Stack, Flex } from '@chakra-ui/react';

import { UserContext } from '../../context/user.context';
import { AuthContext } from '../../context/auth.context';
import ProfilePreview from '../profile-preview/profile-preview.component';
import Avatar from '../avatar/avatar.component';

const Sidebar = () => {
  const history = useHistory();
  const { getUserFeed, userFeed } = useContext(UserContext);
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    getUserFeed(authUser._id);
  }, [getUserFeed, authUser._id]);

  return (
    <Box bg='white' borderRadius='md' overflow='hidden' boxShadow='lg'>
      <Flex
        align='center'
        justify='center'
        bg='teal.500'
        p={4}
        direction='column'
      >
        <Avatar publicId={authUser.avatar} size='large' />
        <Heading size='md' color='white' mt={2}>
          {authUser.name}
        </Heading>
      </Flex>
      <Flex justify='center'>
        <Button onClick={() => history.push('/edit-profile')} m={4}>
          Edit Profile
        </Button>
      </Flex>
      <Stack p={4} spacing={4}>
        <Heading size='sm'>Following</Heading>
        {userFeed &&
          userFeed.map((user) => <ProfilePreview key={user._id} user={user} />)}
        <Button onClick={() => history.push('/users')} mt={4}>
          Browse Users
        </Button>
      </Stack>
    </Box>
  );
};

export default Sidebar;
