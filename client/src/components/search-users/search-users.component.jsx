import { useContext, useState, useEffect } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from '@chakra-ui/react';
import { BsSearch, BsX } from 'react-icons/bs';
import { UserContext } from '../../context/user.context';

const SearchUsers = () => {
  const { handleSearchUsers, getUsers } = useContext(UserContext);
  const [term, setTerm] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (term) {
        handleSearchUsers(term);
        setSearched(true);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [term, handleSearchUsers]);

  const onSearch = () => {
    handleSearchUsers(term);
  };

  const clearSearch = () => {
    setTerm('');
    getUsers();
    setSearched(false);
  };

  return (
    <Box>
      <InputGroup maxW='250px'>
        <InputLeftAddon
          as='button'
          children={<BsSearch />}
          onClick={onSearch}
          bg='teal.400'
          color='white'
        />
        <Input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          bg='white'
        />
        {searched && (
          <InputRightElement
            as='button'
            color='gray.500'
            children={<BsX />}
            onClick={clearSearch}
          />
        )}
      </InputGroup>
    </Box>
  );
};

export default SearchUsers;
