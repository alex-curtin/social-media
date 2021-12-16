import { useState } from 'react';
import { Flex, Textarea, Button } from '@chakra-ui/react';

const TextForm = ({ onSubmit, placeholder = 'Type something...' }) => {
  const [text, setText] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPosting(true);
    onSubmit({ text });
    setText('');
    setIsPosting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction='column' px={4} align='center'>
        <Textarea
          placeholder={placeholder}
          h='200px'
          value={text}
          onChange={handleChange}
          bg='white'
        />
        <Button
          colorScheme='teal'
          w='30%'
          mt={4}
          disabled={!text || isPosting}
          type='submit'
        >
          Post
        </Button>
      </Flex>
    </form>
  );
};

export default TextForm;
