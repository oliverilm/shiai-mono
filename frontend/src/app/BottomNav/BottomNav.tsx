import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from 'app/routes/AppRoute.enum';
import ShiaiIcon from 'components/ShiaiIcon';

import NavDrawer from '../NavDrawer';

const BottomNav: React.FC = ({ children }) => {
  const [value, setValue] = React.useState(0);

  return (
    <>
      <NavDrawer showSidebar={false} />
      <div className="mb-20 mt-16 overflow-x-hidden">{children}</div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        sx={{ position: 'fixed', bottom: 0, width: '100vw' }}
      >
        <BottomNavigationAction
          component={Link}
          to={AppRoute.home}
          label="Home"
          icon={<ShiaiIcon icon="Home" />}
        />

        <BottomNavigationAction
          component={Link}
          to="/competitions"
          label="Competitions"
          icon={<ShiaiIcon icon="Shop" />}
        />
        <BottomNavigationAction
          component={Link}
          to="/clubs"
          label="Clubs"
          icon={<ShiaiIcon icon="Warehouse" />}
        />
        <BottomNavigationAction
          component={Link}
          to="/results"
          label="Results"
          icon={<ShiaiIcon icon="Wallet" />}
        />
      </BottomNavigation>
    </>
  );
};

export default BottomNav;
