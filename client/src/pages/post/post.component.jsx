import { useEffect, useContext } from 'react';
import { Heading, Stack } from '@chakra-ui/react';

import { PostContext } from '../../context/post.context';
import PostPreview from '../../components/post-preview/post-preview.component';
import Comment from '../../components/comment/comment.component';
import TextForm from '../../components/text-form/text-form.component';

const Post = ({ match }) => {
  const { post, getPost, setPost, addComment } = useContext(PostContext);
  const { postId } = match.params;

  useEffect(() => {
    getPost(postId);

    return () => {
      setPost(null);
    };
  }, [getPost, postId, setPost]);

  if (!post) {
    return <Heading size='md'>Loading...</Heading>;
  }

  return (
    <Stack>
      <PostPreview post={post} />
      {post.comments.length &&
        post.comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      <TextForm onSubmit={addComment} placeholder='Add a comment...' />
    </Stack>
  );
};

export default Post;
