import React from 'react';
import { Box } from '@mui/material';

import { Profile } from 'pages';

import OpenCompetitionsList from '../../components/OpenCompetitionsList';
import UserClubCard from '../../components/UserClubCard';
import usePermissions from '../../hooks/usePermissions';
import UserProfileDataForm from './UserProfileDataForm';

const Home: React.FC = () => {
  const { isLoggedIn, isProfileDataFilled } = usePermissions();

  return (
    <Box flex={1}>
      {isLoggedIn && !isProfileDataFilled && <UserProfileDataForm />}
      <Box display="flex" flexWrap="wrap" justifyContent="space-evenly">
        <OpenCompetitionsList />
        <UserClubCard />
      </Box>
      <Profile />
    </Box>
  );
};

export default Home;
