import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

const ModalComponent = ({
  isOpen,
  onClose,
  children,
  title,
  buttons,
  size = 'md',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {title}
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button onClick={onClose} mr={4} colorScheme='blue'>
            Cancel
          </Button>
          {buttons}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
