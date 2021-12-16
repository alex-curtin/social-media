import { Stack } from '@chakra-ui/react';

import ChangeAvatar from '../../components/change-avatar/change-avatar.component';
import EditAbout from '../../components/edit-about/edit-about.component';

const EditProfile = () => {
  return (
    <Stack spacing={8}>
      <ChangeAvatar />
      <EditAbout />
    </Stack>
  );
};

export default EditProfile;
