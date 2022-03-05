import React from 'react';
import { Navigate, Route } from 'react-router-dom';

import { AppRoute } from './AppRoute.enum';
import { AuthorizedRouteProps } from './AuthorizedRoute.types';
import { useAppSelector } from '../../hooks/useRedux';

export const PrivateWrapper: React.FC<{
  element: React.ReactElement;
}> = ({ element }) => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  return isLoggedIn ? element : <Navigate to={AppRoute.login} />;
};

export const AuthorizedRoute: AuthorizedRouteProps = (
  props,
): React.ReactElement => {
  const { isLoggedIn } = useAppSelector((state) => state.user);

  return isLoggedIn ? <Route {...props} /> : <Navigate to={AppRoute.login} />;
};
