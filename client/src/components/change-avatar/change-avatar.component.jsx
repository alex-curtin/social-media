import { useState, useContext } from 'react';
import {
  Flex,
  Input,
  Image,
  Box,
  Button,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';

import Modal from '../modal/modal.component';
import Avatar from '../avatar/avatar.component';
import { UserContext } from '../../context/user.context';
import { AuthContext } from '../../context/auth.context';

const ChangeAvatar = () => {
  const { authUser } = useContext(AuthContext);
  const { handleUpdateAvatar } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [previewImage, setPreviewImage] = useState('');
  const [selectedFile, setSelectedFile] = useState();

  const handleChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmitImage = (e) => {
    e.preventDefault();
    handleUpdateAvatar(selectedFile);
    onClose();
  };

  return (
    <>
      <Flex
        direction='column'
        justify='center'
        align='center'
        bg='white'
        boxShadow='lg'
        p={4}
        borderRadius='md'
      >
        <Avatar publicId={authUser.avatar} size='large' />
        <Button onClick={onOpen} mt={4} colorScheme='blue'>
          Change Avatar
        </Button>
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={<Heading size='lg'>Update Avatar</Heading>}
        buttons={
          <Button onClick={handleSubmitImage} disabled={!selectedFile}>
            Submit
          </Button>
        }
      >
        <Flex direction='column' justify='center' align='center' width='100%'>
          <Box>
            {previewImage && (
              <Image
                src={previewImage}
                h='150px'
                w='150px'
                objectFit='cover'
                borderRadius='50%'
                border='4px'
                borderColor='teal.500'
                mb={4}
              />
            )}
          </Box>
          <Input type='file' onChange={handleChange} />
        </Flex>
      </Modal>
    </>
  );
};

export default ChangeAvatar;
