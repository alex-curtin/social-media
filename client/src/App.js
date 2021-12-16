import { useEffect, useContext } from 'react';
import { Container, Box } from '@chakra-ui/react';
import { Route } from 'react-router-dom';

import './App.css';

import Navbar from './components/navbar/navbar.component';
import Signup from './pages/signup/signup.component';
import Signin from './pages/signin/signin.component';
import Home from './pages/home/home.component';
import Users from './pages/users/users.component';
import Profile from './pages/profile/profile.component';
import Post from './pages/post/post.component';
import EditProfile from './pages/edit-profile/edit-profile.component';
import PrivateRoute from './routing/private-route.component';

import { setAuthToken } from './lib/api';
import { AuthContext } from './context/auth.context';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const { getAuthUser } = useContext(AuthContext);

  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.token) {
        getAuthUser();
      }
    };

    checkAuth();
  }, [getAuthUser]);

  return (
    <>
      <Navbar />
      <Box bg='gray.100' minH='100vh'>
        <Container padding={5} maxW='container.xl'>
          <PrivateRoute exact path='/' component={Home} />
          <Route path='/signup' component={Signup} />
          <Route path='/signin' component={Signin} />
          <Route exact path='/users' component={Users} />
          <Route path='/users/profile/:userId' component={Profile} />
          <Route path='/posts/:postId' component={Post} />
          <PrivateRoute path='/edit-profile/' component={EditProfile} />
        </Container>
      </Box>
    </>
  );
};

export default App;
