import { useContext } from 'react';
import { Box, Heading } from '@chakra-ui/react';

import { PostContext } from '../../context/post.context';
import PostPreview from '../post-preview/post-preview.component';

const PostFeed = () => {
  const { posts } = useContext(PostContext);

  return (
    <>
      {posts.length ? (
        posts.map((post) => <PostPreview key={post._id} post={post} />)
      ) : (
        <Box mt={4} p={4}>
          <Heading size='md'>No posts yet</Heading>
        </Box>
      )}
    </>
  );
};

export default PostFeed;
