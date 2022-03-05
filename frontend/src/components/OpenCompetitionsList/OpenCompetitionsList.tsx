import React from 'react';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableCell,
  TableRow,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import { useAppSelector } from '../../hooks/useRedux';
import usePermissions from '../../hooks/usePermissions';
import ShiaiIcon from '../ShiaiIcon';
import { AppRoute } from '../../app/routes/AppRoute.enum';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const OpenCompetitionsList: React.FC = () => {
  const { competitions } = useAppSelector((s) => s.competitions);
  const { canCreateCompetition } = usePermissions();

  const openCompetitions = competitions.filter(
    (comp) => new Date(comp.start) > new Date(),
  );

  return (
    <Box sx={{ width: '600px' }}>
      <Paper elevation={0}>
        <Table size="small">
          <StyledTableRow style={{ height: '3rem' }}>
            <TableCell>Name</TableCell>
            {openCompetitions.length > 0 && <TableCell />}

            <TableCell align="right">Date</TableCell>
            {openCompetitions.length > 0 && <TableCell />}
          </StyledTableRow>
          {openCompetitions.length === 0 ? (
            <StyledTableRow>
              <TableCell colSpan={2}>No upcoming competitions</TableCell>
            </StyledTableRow>
          ) : (
            openCompetitions.map((comp) => (
              <StyledTableRow>
                <TableCell>{comp.name}</TableCell>
                <TableCell>
                  <Box
                    component="div"
                    display="flex"
                    alignItems="center"
                    gap="1rem"
                  >
                    <ShiaiIcon icon="Person-1-Group" />
                    <div>{comp.competitorAmount}</div>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {new Date(comp.start).toLocaleDateString('et-EE')}
                </TableCell>
                <TableCell style={{ width: 50 }}>
                  <IconButton
                    style={{ padding: 0 }}
                    component={Link}
                    to={`/competitions/${comp.slug}`}
                  >
                    <ShiaiIcon icon="Chevron-Right-Small" />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))
          )}
          {canCreateCompetition && (
            <StyledTableRow>
              <TableCell
                align="center"
                colSpan={openCompetitions.length > 0 ? 4 : 2}
              >
                <Button
                  component={Link}
                  to={AppRoute.competitions_create}
                  style={{ padding: '0 1rem' }}
                  variant="text"
                  endIcon={<ShiaiIcon icon="Plus" />}
                >
                  Create new
                </Button>
              </TableCell>
            </StyledTableRow>
          )}
        </Table>
      </Paper>
    </Box>
  );
};

export default OpenCompetitionsList;
