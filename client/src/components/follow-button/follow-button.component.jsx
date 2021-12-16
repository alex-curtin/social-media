import { useContext } from 'react';
import { Button } from '@chakra-ui/react';

import { AuthContext } from '../../context/auth.context';
import { UserContext } from '../../context/user.context';

// only works properly on profile page
const FollowButton = () => {
  const { authUser } = useContext(AuthContext);
  const { handleUnfollowUser, handleFollowUser, userProfile } =
    useContext(UserContext);

  return (
    <>
      {authUser.following.includes(userProfile._id) ? (
        <Button onClick={() => handleUnfollowUser(userProfile._id)}>
          Unfollow
        </Button>
      ) : (
        <Button onClick={() => handleFollowUser(userProfile._id)}>
          Follow
        </Button>
      )}
    </>
  );
};

export default FollowButton;
