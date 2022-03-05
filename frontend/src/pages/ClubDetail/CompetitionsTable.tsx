import {
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Box,
  IconButton,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import ResponsiveTable from 'components/ResponsiveTable';
import { useAppSelector } from 'hooks/useRedux';
import { AppRoute } from 'app/routes/AppRoute.enum';

import { IClub, IClubAdditionalCompetition } from '../../@types/api-types';
import ShiaiIcon from '../../components/ShiaiIcon';

interface CompetitionsTableProps {
  competitions: IClubAdditionalCompetition[];
  club: IClub;
}

const CompetitionsTable: React.FC<CompetitionsTableProps> = ({
  competitions,
  club,
}): JSX.Element => {
  const { user } = useAppSelector((s) => s.user);
  const borderBottom = '1px solid #d4d4d4';
  return (
    <ResponsiveTable size="small">
      <TableBody>
        <TableRow sx={{ borderBottom }}>
          <TableCell sx={{ borderBottom }}>
            <Box display="flex" gap="1rem" alignItems="center">
              <ShiaiIcon icon="Calendar" style={{ padding: 0 }} />{' '}
              <div>{competitions?.length ?? 0}</div>
            </Box>
          </TableCell>
          <TableCell sx={{ borderBottom }}>
            <Box display="flex" gap="1rem" alignItems="center">
              <ShiaiIcon icon="Person-2-Group" style={{ padding: 0 }} />
              <div>
                {competitions?.reduce((a, c) => a + c.competitorAmount, 0)}
              </div>
            </Box>
          </TableCell>
          {user &&
            club.isUserClub &&
            (club.owner === user.id || user.profile.isClubOwner) && (
              <TableCell
                sx={{ borderBottom: '1px solid #d4d4d4' }}
                colSpan={2}
                align="right"
              >
                <Box
                  display="flex"
                  gap="1rem"
                  justifyContent="center"
                  alignItems="center"
                >
                  <div>Create new</div>

                  <IconButton
                    sx={{ padding: 0 }}
                    component={Link}
                    to={AppRoute.competitions_create}
                  >
                    <ShiaiIcon icon="Plus" style={{ padding: 0 }} />
                  </IconButton>
                </Box>
              </TableCell>
            )}
        </TableRow>
        {competitions.length > 0 ? (
          competitions.map((comp) => (
            <TableRow key={comp.slug} hover className="p-0">
              <TableCell align="right">
                <Box display="flex" gap="1rem">
                  {comp.active ? (
                    <Chip
                      label="Active"
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ) : (
                    <Chip
                      label="Ended"
                      size="small"
                      color="secondary"
                      variant="outlined"
                    />
                  )}
                  <div> {comp.name}</div>
                </Box>
              </TableCell>

              <TableCell align="center" className="p-0">
                <Box display="flex" alignItems="center" gap="1rem">
                  <ShiaiIcon icon="Person-1-Group" /> {comp.competitorAmount}
                </Box>
              </TableCell>
              <TableCell align="right" className="p-0">
                {new Date(comp.start).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <IconButton
                  style={{ padding: 0 }}
                  component={Link}
                  to={`/competitions/${comp.slug}`}
                >
                  <ShiaiIcon icon="Chevron-Right-Small" />
                </IconButton>
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
    </ResponsiveTable>
  );
};
export default CompetitionsTable;
