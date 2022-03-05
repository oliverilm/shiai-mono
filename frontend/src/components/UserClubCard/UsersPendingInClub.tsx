import React from 'react';
import { Box, Button, Divider } from '@mui/material';
import { GroupAddOutlined } from '@mui/icons-material';

import usePermissions from '../../hooks/usePermissions';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { IUserPendingInClub } from '../../@types/api-types';
import { pendingActionThunk } from '../../redux/club/actions';

const UsersPendingInClub: React.FC = () => {
  const { isTrainer, isClubOwner } = usePermissions();
  const dispatch = useAppDispatch();
  const pendingUsers = useAppSelector((s) => s.clubs.pending);

  const accept = (p: IUserPendingInClub) => {
    dispatch(pendingActionThunk({ pending: p, action: 'accept' }));
  };

  const decline = (p: IUserPendingInClub) => {
    dispatch(pendingActionThunk({ pending: p, action: 'decline' }));
  };
  return pendingUsers.length > 0 && (isTrainer || isClubOwner) ? (
    <div>
      <Divider />

      <Box marginTop="1rem">
        {pendingUsers.map((p) => (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box gap="1rem" display="flex">
              <GroupAddOutlined /> <Box>{p.user.email}</Box>
            </Box>

            <Box display="flex" gap="1rem">
              <Button color="primary" onClick={() => accept(p)}>
                Accept
              </Button>
              <Button color="secondary" onClick={() => decline(p)}>
                decline
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  ) : (
    <></>
  );
};

export default UsersPendingInClub;
