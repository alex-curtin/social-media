import { Link } from 'react-router-dom';
import { Text } from '@chakra-ui/react';

const UserLink = ({ user }) => {
  return (
    <Link to={`/users/profile/${user._id}`}>
      <Text display='inline'>{user.name}</Text>
    </Link>
  );
};

export default UserLink;
