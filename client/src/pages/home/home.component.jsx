import { useContext, useEffect } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

import TextForm from '../../components/text-form/text-form.component';
import PostFeed from '../../components/post-feed/post-feed.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import { PostContext } from '../../context/post.context';
import { AuthContext } from '../../context/auth.context';

const Home = () => {
  const { getPostFeed, setPosts, addPost } = useContext(PostContext);
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    getPostFeed(authUser._id);

    return () => {
      setPosts([]);
    };
  }, [getPostFeed, setPosts, authUser._id]);

  return (
    <Grid templateColumns='repeat(3, 1fr)' gap={4} height='auto' width='100%'>
      <GridItem rowSpan={2} colSpan={1}>
        <Sidebar />
      </GridItem>
      <GridItem colSpan={2}>
        <TextForm onSubmit={addPost} placeholder='Post something...' />
      </GridItem>
      <GridItem colSpan={2}>
        <PostFeed />
      </GridItem>
    </Grid>
  );
};

export default Home;
