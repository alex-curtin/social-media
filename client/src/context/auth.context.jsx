import { createContext, useState, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';

import { fetchAuthUser, setAuthToken, signin, signup } from '../lib/api';
import alertOptions from '../lib/alert-options';

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const toast = useToast();

  const getAuthUser = useCallback(async () => {
    const user = await fetchAuthUser();
    setAuthUser(user);
  }, []);

  const handleSignUp = async (data) => {
    try {
      const res = await signup(data);

      localStorage.setItem('token', res.token);
      setAuthToken(res.token);
      setAuthUser(res.user);
      toast(alertOptions.signup_success);
    } catch (error) {
      toast(alertOptions.server_error);
    }
  };

  const handleSignIn = async (data) => {
    try {
      const res = await signin(data);

      localStorage.setItem('token', res.token);
      setAuthToken(res.token);
      setAuthUser(res.user);
    } catch (error) {
      if (!error.response) {
        toast(alertOptions.server_error);
      }

      if (error.response.status === 401) {
        toast(alertOptions.invalid_credentials);
      }

      return error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        getAuthUser,
        setAuthUser,
        handleSignIn,
        handleSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
