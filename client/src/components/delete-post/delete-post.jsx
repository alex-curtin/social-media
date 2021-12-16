import { useContext } from 'react';
import {
  Box,
  Text,
  Button,
  Heading,
  useDisclosure,
  MenuItem,
} from '@chakra-ui/react';

import Modal from '../modal/modal.component';
import { PostContext } from '../../context/post.context';

const DeletePost = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { handleDeletePost } = useContext(PostContext);

  return (
    <>
      <MenuItem onClick={onOpen}>delete</MenuItem>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={<Heading size='md'>Delete Post?</Heading>}
        buttons={
          <Button onClick={handleDeletePost} colorScheme='red'>
            Confirm
          </Button>
        }
      >
        <Box>
          <Text>Are you sure? This action can't be undone.</Text>
        </Box>
      </Modal>
    </>
  );
};

export default DeletePost;
