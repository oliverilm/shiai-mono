/* eslint-disable import/order */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './Competitions.style.css';

import { List, useTheme } from '@mui/material';

import CompetitionsPhoneListItem from 'components/CompetitionsPhoneListItem/CompetitionsPhoneListItem';

import { useAppSelector } from '../../hooks/useRedux';

const Competitions: React.FC = (): JSX.Element => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const { competitions } = useAppSelector((state) => state.competitions);
  const theme = useTheme();

  return (
    <List
      sx={{ width: '100%', backgroundColor: theme.palette.background.paper }}
    >
      {competitions.map((comp) => (
        <CompetitionsPhoneListItem
          competition={comp}
          isAuthenticated={isLoggedIn}
        />
      ))}
    </List>
  );
};

export default Competitions;
