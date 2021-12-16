import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Stack,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { AuthContext } from '../../context/auth.context';

const Signin = () => {
  const history = useHistory();
  const { authUser, handleSignIn } = useContext(AuthContext);

  if (authUser) {
    history.push('/');
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    handleSignIn(data);

    history.push('/');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5}>
          <Heading size='lg'>Sign In</Heading>

          <FormControl isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 4,
                  message: 'Password cannot be fewer than 4 characters',
                },
                maxLength: {
                  value: 10,
                  message: 'Password cannot be more than 10 characters',
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.signin}>
            <FormErrorMessage>
              {errors.signin && errors.signin.message}
            </FormErrorMessage>
          </FormControl>

          <Button type='submit' isLoading={isSubmitting}>
            Sign In
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default Signin;
