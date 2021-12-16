import { Text, Box, Heading, Stack } from '@chakra-ui/react';

import { formatDate } from '../../lib/date';
import UserLink from '../user-link/user-link';

const Comment = ({ comment }) => {
  return (
    <Box px={4}>
      <Stack p={4} bg='white' boxShadow='md' borderRadius='md'>
        <Text mb={2}>{comment.text}</Text>
        <Heading size='xs' textAlign='right'>
          by <UserLink user={comment.postedBy} /> at{' '}
          {formatDate(comment.createdAt)}
        </Heading>
      </Stack>
    </Box>
  );
};

export default Comment;
