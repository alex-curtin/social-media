import { useContext, useState } from 'react';
import { Text, Box } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { AuthContext } from '../../context/auth.context';
import { likePost } from '../../lib/api';

const Like = ({ post }) => {
  const { likes, _id: postId } = post;
  const { authUser } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(likes.includes(authUser._id));
  const [likesCount, setLikesCount] = useState(likes.length);

  const handleToggleLike = async () => {
    await likePost(postId);
    if (isLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <>
      <Box onClick={handleToggleLike}>
        {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
      </Box>
      <Text>{likesCount}</Text>
    </>
  );
};

export default Like;
