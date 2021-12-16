import { Stack, Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BsArrowRightCircle } from 'react-icons/bs';
import Avatar from '../avatar/avatar.component';

const ProfilePreview = ({ user }) => {
  return (
    <Flex
      alignItems='center'
      bg='white'
      p={4}
      borderRadius='md'
      boxShadow='md'
      justify='space-between'
      maxW='500px'
    >
      <Stack direction='row' alignItems='center'>
        <Avatar publicId={user.avatar} />
        <Heading size='sm' ml={2}>
          {user.name}
        </Heading>
      </Stack>
      <Link to={`/users/profile/${user._id}`}>
        <BsArrowRightCircle />
      </Link>
    </Flex>
  );
};

export default ProfilePreview;
