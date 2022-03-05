import React from 'react';
import { Divider, Table, TableBody, TableCell, TableRow } from '@mui/material';

import ProfileAvatar from 'components/ProfileAvatar';
import ShiaiIcon from 'components/ShiaiIcon';

import { useAppSelector } from '../../hooks/useRedux';

const Profile: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);

  if (user)
    return (
      <div className="w-full tablet:flex">
        <div className="tablet:block flex row justify-center">
          <ProfileAvatar
            src={
              user.profile.avatarUrl ||
              `https://avatars.dicebear.com/api/${
                user.profile.sex ?? 'male'
              }/${JSON.stringify(user.profile)}.svg?mood[]=happy`
            }
          />
        </div>
        <div className="w-full text-center tablet:text-left">
          <div className="font-bold text-4xl my-4">{user.email}</div>
          <Divider />
          <Table className="w-auto max-w-2xl" size="small">
            <TableBody>
              <TableRow hover className="p-0">
                <TableCell align="left" className="p-0">
                  Email
                </TableCell>
                <TableCell align="right" className="p-0 m-0">
                  {user.email}
                </TableCell>
                <TableCell align="right" className="p-0 m-0" />
              </TableRow>

              <TableRow hover className="p-0">
                <TableCell align="left" className="p-0">
                  First Name
                </TableCell>
                <TableCell align="right" className="p-0 m-0">
                  {user.first_name}
                </TableCell>
                <TableCell align="right" className="p-0 m-0">
                  <ShiaiIcon icon="Edit-Box" />
                </TableCell>
              </TableRow>

              <TableRow hover className="p-0">
                <TableCell align="left" className="p-0">
                  Last Name
                </TableCell>
                <TableCell align="right" className="p-0 m-0">
                  {user.last_name}
                </TableCell>
                <TableCell align="right" className="p-0 m-0">
                  <ShiaiIcon icon="Edit-Box" />
                </TableCell>
              </TableRow>

              <TableRow hover className="p-0">
                <TableCell align="left" className="p-0">
                  Birthday
                </TableCell>
                <TableCell align="right" className="p-0 m-0">
                  {user.profile.birthDate}
                </TableCell>
                <TableCell align="right" className="p-0 m-0">
                  <ShiaiIcon icon="Edit-Box" />
                </TableCell>
              </TableRow>

              <TableRow hover className="p-0">
                <TableCell align="left" className="p-0">
                  Sex
                </TableCell>
                <TableCell align="right" className="p-0 m-0">
                  {user.profile.sex}
                </TableCell>
                <TableCell align="right" className="p-0 m-0">
                  <ShiaiIcon icon="Edit-Box" />
                </TableCell>
              </TableRow>

              <TableRow hover className="p-0">
                <TableCell align="left" className="p-0">
                  Origin
                </TableCell>
                <TableCell align="right" className="p-0 m-0">
                  {user.profile.country}
                </TableCell>
                <TableCell align="right" className="p-0 m-0">
                  <ShiaiIcon icon="Edit-Box" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );

  return <></>;
};

export default Profile;
