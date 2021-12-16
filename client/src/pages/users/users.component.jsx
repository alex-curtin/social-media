import { useContext, useEffect } from 'react';
import { Stack } from '@chakra-ui/react';

import { UserContext } from '../../context/user.context';
import ProfilePreview from '../../components/profile-preview/profile-preview.component';
import SearchUsers from '../../components/search-users/search-users.component';

const Users = () => {
  const { users, getUsers } = useContext(UserContext);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Stack>
      <SearchUsers />
      {users.map((user) => (
        <ProfilePreview key={user._id} user={user} />
      ))}
    </Stack>
  );
};

export default Users;
