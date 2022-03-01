/** @format */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// will remove later
import { useUserContext } from '../context/user_context';

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <div>
      <h4>Private Route</h4>
      {children}
    </div>
  );
};
export default PrivateRoute;
