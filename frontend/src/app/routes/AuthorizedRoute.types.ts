import React from 'react';
import { RouteProps } from 'react-router';

export type AuthorizedRouteProps<T = RouteProps> = {
  (props: T): React.ReactElement<T>;
};
