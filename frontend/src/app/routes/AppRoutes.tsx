import React from 'react';
import { Route, Routes as Switch, Navigate } from 'react-router-dom';

import {
  Register,
  Competitions,
  Results,
  Profile,
  CreateCompetition,
  CompetitionDetail,
  ClubCreate,
  ClubDetail,
  Login,
  Home,
  About,
} from 'pages';

import { AppRoute } from './AppRoute.enum';
import { PrivateWrapper } from './AuthorizedRoute';
import { useAppSelector } from '../../hooks/useRedux';

const AppRoutes: React.FC = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);

  return (
    <Switch>
      <Route path={AppRoute.home} element={<Home />} />
      <Route path={AppRoute.about} element={<About />} />
      <Route
        path={AppRoute.competitions_create}
        element={<PrivateWrapper element={<CreateCompetition />} />}
      />
      <Route
        path={AppRoute.clubs_create}
        element={<PrivateWrapper element={<ClubCreate />} />}
      />
      <Route path={AppRoute.clubs_detail} element={<ClubDetail />} />
      <Route
        path={AppRoute.competition_detail}
        element={<CompetitionDetail />}
      />
      <Route path={AppRoute.competitions} element={<Competitions />} />

      <Route path={AppRoute.results} element={<Results />} />

      <Route
        path={AppRoute.profile}
        element={<PrivateWrapper element={<Profile />} />}
      />

      {!isLoggedIn && (
        <>
          <Route path={AppRoute.login} element={<Login />} />
          <Route path={AppRoute.register} element={<Register />} />
        </>
      )}

      {/* fallback. if route is not specified before this line, navigate back to home page */}
      <Route path="*" element={<Navigate to={AppRoute.home} />} />
    </Switch>
  );
};

export default AppRoutes;
