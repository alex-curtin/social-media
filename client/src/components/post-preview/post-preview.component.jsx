import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Center,
  Stack,
  Flex,
  Spacer,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import { BiComment } from 'react-icons/bi';
import { BsArrowRightCircle } from 'react-icons/bs';

import Avatar from '../avatar/avatar.component';
import Like from '../like/like.component';
import UserLink from '../user-link/user-link';
import PostOptions from '../post-options/post-options.component';
import { formatDate } from '../../lib/date';
import { AuthContext } from '../../context/auth.context';

const PostPreview = ({ post }) => {
  const { authUser } = useContext(AuthContext);
  const isPostPage = window.location.href.includes('posts');
  const isAuthUserPost = authUser._id === post.postedBy._id;

  return (
    <Center py={3}>
      <Box boxShadow='lg' rounded='md' w='100%' bg='white' overflow='hidden'>
        <Flex mb={3} bg='blue.500' p={4} align='center' direction='row'>
          <Avatar publicId={post.postedBy.avatar} />
          <Stack spacing='4px' ml={2}>
            <Heading size='sm' color='gray.100'>
              <UserLink user={post.postedBy} />
            </Heading>
            <Heading size='xs' color='gray.100'>
              posted {formatDate(post.createdAt)}
            </Heading>
          </Stack>
          <Spacer />
          {!isPostPage && (
            <Link to={`/posts/${post._id}`}>
              <Box color='white'>
                <BsArrowRightCircle />
              </Box>
            </Link>
          )}
          {isPostPage && isAuthUserPost && <PostOptions />}
        </Flex>
        <Box p={4}>
          <Text>{post.text}</Text>
        </Box>
        <Stack direction='row' alignItems='center' p={4}>
          <Like post={post} />
          <Spacer />
          <BiComment />
          <Text>{post.comments.length}</Text>
        </Stack>
      </Box>
    </Center>
  );
};

export default PostPreview;
