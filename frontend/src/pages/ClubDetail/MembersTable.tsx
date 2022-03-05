/* eslint-disable prettier/prettier */
import {TableBody, TableRow, TableCell, Chip, styled, Box} from '@mui/material';
import React from 'react';

import ResponsiveTable from 'components/ResponsiveTable';
import ShiaiIcon from 'components/ShiaiIcon';

import { IClubAdditionalMember } from '../../@types/api-types';
import usePermissions from "../../hooks/usePermissions";

interface MembersTableProps {
  members: IClubAdditionalMember[];
}

const RowCenter = styled(Box)`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const MembersTable: React.FC<MembersTableProps> = ({
  members,
}): JSX.Element => {

  const { isClubOwner: ownerPermission } = usePermissions()

  const getBadge = (
    member: IClubAdditionalMember,
  ): {
    label: string;
    color: 'primary' | 'secondary' | 'default';
  } => {
    const {
      user: { isTrainer, isClubOwner }
    } = member;

    if (isClubOwner) {
      return { label: 'Owner', color: 'primary' };
    }

    if (isTrainer && !isClubOwner) {
      return { label: 'Coach', color: 'secondary' };
    }

    return { label: 'Judoka', color: 'default' };
  };

  return (
    <ResponsiveTable size="small">
      <TableBody>
        <TableRow sx={{ borderBottom: "1px solid #d4d4d4"}}>
          <TableCell sx={{ borderBottom: "1px solid #d4d4d4"}}>
            <RowCenter>
              <ShiaiIcon size={26} icon="Person-2-Group" /> {members.length}
            </RowCenter>
          </TableCell>
        </TableRow>
        {members.length > 0 ? (
          members.map((member) => (
            <TableRow key={member.id} hover onClick={() => { }}>
              <TableCell align="left">
                <Chip size="small" {...getBadge(member)} variant="outlined" />
              </TableCell>
              <TableCell align="left" >
                {member.user.email}
              </TableCell>
              {ownerPermission && (
                <TableCell align="right">
                  <ShiaiIcon icon="More-Vertical" />
                  {/* TODO : add actions for user Promotion and Demotion */}
                </TableCell>
              )}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              sx={{ borderBottom: 'none' }}
              colSpan={3}
              align="center"
            >
              <div className="m-3">Nothing to show</div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </ResponsiveTable>
  );
};

export default MembersTable;
