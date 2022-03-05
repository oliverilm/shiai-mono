import { Table, TableBody, TableRow, TableCell, Button } from '@mui/material';
import React from 'react';

import API from 'API';

import { IUserPendingInClub } from '../../@types/api-types';

interface PendingUsersTableProps {
  pending: IUserPendingInClub[];
  updatePending: () => void;
  updateMembers: () => void;
}

const PendingUsersTable: React.FC<PendingUsersTableProps> = ({
  pending,
  updatePending = () => {},
  updateMembers = () => {},
}): JSX.Element => {
  const accept = (p: IUserPendingInClub) => {
    API.club.acceptPending(p.id).then(() => {
      updateMembers();
      updatePending();
    });
  };

  const decline = (p: IUserPendingInClub) => {
    API.club.declinePending(p.id).then(() => {
      updatePending();
    });
  };

  return (
    <Table className="w-auto" size="small">
      <TableBody>
        {pending.length > 0 ? (
          pending.map((p) => (
            <TableRow key={p.id} hover className="p-0">
              <TableCell align="right" className="p-0">
                {p.user.email}
              </TableCell>
              <TableCell align="center" className="p-0">
                {p.user.username}
              </TableCell>

              <TableCell align="left" className="p-0">
                <Button
                  variant="outlined"
                  color="primary"
                  className="mr-4 pr-4"
                  onClick={() => accept(p)}
                >
                  Accept
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => decline(p)}
                >
                  Decline
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              style={{ borderBottom: 'none' }}
              colSpan={3}
              align="center"
            >
              <div className="m-3">Nothing to show</div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PendingUsersTable;
