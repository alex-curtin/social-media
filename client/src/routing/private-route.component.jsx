import { useContext } from 'react';
import { Route } from 'react-router-dom';

import Signin from '../pages/signin/signin.component';

import { AuthContext } from '../context/auth.context';

const PrivateRoute = ({ component, ...routeProps }) => {
  const { authUser } = useContext(AuthContext);
  const finalComponent = authUser ? component : Signin;

  return <Route {...routeProps} component={finalComponent} />;
};

export default PrivateRoute;
