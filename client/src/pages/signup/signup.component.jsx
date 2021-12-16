import { useRef, useContext } from 'react';
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

const Signup = () => {
  const history = useHistory();
  const { authUser, handleSignUp } = useContext(AuthContext);

  if (authUser) {
    history.push('/');
  }

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch('password');

  const onSubmit = async (data) => {
    handleSignUp(data);
    history.push('/');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5}>
          <Heading size='lg'>Sign Up</Heading>
          <FormControl isInvalid={errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 4,
                  message: 'Name cannot be fewer than 4 characters',
                },
                maxLength: {
                  value: 10,
                  message: 'Name cannot be longer than 10 characters',
                },
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

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
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.confirm_password}>
            <FormLabel>Confirm password</FormLabel>
            <Input
              type='password'
              {...register('confirm_password', {
                required: 'Please confirm password',
                validate: (value) =>
                  value === password.current || 'Passwords do not match',
              })}
            />
            <FormErrorMessage>
              {errors.confirm_password && errors.confirm_password.message}
            </FormErrorMessage>
          </FormControl>

          <Button type='submit'>Sign Up</Button>
        </Stack>
      </form>
    </>
  );
};

export default Signup;
