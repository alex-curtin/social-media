import { useContext, useState } from 'react';
import {
  MenuItem,
  Heading,
  Button,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';

import { PostContext } from '../../context/post.context';
import Modal from '../modal/modal.component';

const EditPost = () => {
  const { post, handleUpdatePost } = useContext(PostContext);
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [text, setText] = useState(post.text);

  const onSubmit = () => {
    handleUpdatePost({ text });
    onClose();
  };

  return (
    <>
      <MenuItem onClick={onOpen}>edit</MenuItem>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='xl'
        title={<Heading size='md'>Edit Post</Heading>}
        buttons={<Button onClick={onSubmit}>Make Changes</Button>}
      >
        <form>
          <Textarea
            value={text}
            size='lg'
            h='200px'
            onChange={(e) => setText(e.target.value)}
          />
        </form>
      </Modal>
    </>
  );
};

export default EditPost;
