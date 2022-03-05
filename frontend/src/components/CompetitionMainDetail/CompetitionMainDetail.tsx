import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';

import { ICompetition } from '../../@types/api-types';

interface Props {
  competition: ICompetition;
}
const MainDetailTable: React.FC<Props> = ({ competition }) => {
  const { location, registrationEndDate } = competition;
  const regDate = new Date(registrationEndDate);
  const regHours = regDate.getHours().toString().padStart(2, '0');
  const regMinutes = regDate.getMinutes().toString().padStart(2, '0');
  const regTime = `${regHours}:${regMinutes}`;
  const regEndDateString = `${regDate.toDateString()} ${regTime}`;

  return (
    <Table aria-label="simple table">
      <TableBody>
        <TableRow>
          <TableCell>Start date</TableCell>
          <TableCell align="right">datest</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Location</TableCell>
          <TableCell align="right">{location}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Registration ends</TableCell>
          <TableCell align="right">{regEndDateString}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Location</TableCell>
          <TableCell align="right">{location}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
export default MainDetailTable;
