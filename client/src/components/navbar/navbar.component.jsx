import { useContext } from 'react';
import { Heading, Flex, Box, Stack, Button, Spacer } from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';

import { AuthContext } from '../../context/auth.context';

import Avatar from '../avatar/avatar.component';

const Navbar = () => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const history = useHistory();

  const signout = () => {
    setAuthUser(null);
    localStorage.removeItem('token');
    history.push('/signin');
  };

  return (
    <Flex as='nav' bg='teal.500' color='white' padding={5} alignItems='center'>
      <Box>
        <Link to='/'>
          <Heading size='md' letterSpacing={0}>
            Hello World
          </Heading>
        </Link>
      </Box>
      <Spacer />
      {authUser ? (
        <Flex alignItems='center'>
          <Heading size='md' mr={4}>
            welcome {authUser.name}
          </Heading>
          <Box mr={4}>
            <Avatar publicId={authUser.avatar} />
          </Box>
          <Button colorScheme='yellow' onClick={signout}>
            Sign Out
          </Button>
        </Flex>
      ) : (
        <Stack spacing={4} direction='row'>
          <Link to='/signin'>
            <Button colorScheme='yellow'>Sign In</Button>
          </Link>
          <Link to='/signup'>
            <Button colorScheme='yellow'>Sign Up</Button>
          </Link>
        </Stack>
      )}
    </Flex>
  );
};

export default Navbar;
