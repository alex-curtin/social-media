import { Menu, MenuButton, MenuList, IconButton } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';

import DeletePost from '../delete-post/delete-post';
import EditPost from '../edit-post/edit-post.compoent';

const PostOptions = () => {
  return (
    <Menu>
      <MenuButton
        aria-label='options'
        as={IconButton}
        icon={<BsThreeDots />}
        variant='link'
        color='white'
      />
      <MenuList>
        <DeletePost />
        <EditPost />
      </MenuList>
    </Menu>
  );
};

export default PostOptions;
