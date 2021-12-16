import { useContext, useState } from 'react';
import { Flex, Textarea, Button, Heading } from '@chakra-ui/react';

import { AuthContext } from '../../context/auth.context';
import { UserContext } from '../../context/user.context';

const EditAbout = () => {
  const { authUser } = useContext(AuthContext);
  const { handleUpdateProifle } = useContext(UserContext);
  const [text, setText] = useState(authUser.about || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = () => {
    setIsSubmitting(true);
    handleUpdateProifle({ about: text });
    setIsSubmitting(false);
  };

  return (
    <Flex
      direction='column'
      justify='center'
      align='center'
      p={4}
      bg='white'
      boxShadow='lg'
      borderRadius='md'
    >
      <Heading size='md'>About</Heading>

      <Textarea
        value={text}
        h='200px'
        placeholder='A little something about yourself...'
        mt={4}
        onChange={(e) => setText(e.target.value)}
        bg='gray.100'
      />

      <Button
        colorScheme='blue'
        mt={4}
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        Save
      </Button>
    </Flex>
  );
};

export default EditAbout;
