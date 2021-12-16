import { useState, useContext } from 'react';
import { Flex, Textarea, Button } from '@chakra-ui/react';

import { PostContext } from '../../context/post.context';

const AddPost = () => {
  const { addPost } = useContext(PostContext);
  const [text, setText] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPosting(true);
    addPost({ text });
    setText('');
    setIsPosting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction='column' px={4} align='center'>
        <Textarea
          placeholder='Post something...'
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

export default AddPost;
