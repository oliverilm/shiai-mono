import React from 'react';
import { Table, TableCell } from '@mui/material';

import { ICompetition } from '../../@types/api-types';
import StripedTableRow from '../../components/Custom';

const CompetitionInformationTable: React.FC<{ competition: ICompetition }> = ({
  competition,
}) => (
  <Table size="small">
    <StripedTableRow>
      <TableCell colSpan={2}>
        {competition.requireLicence
          ? 'Registration is open for only licenced judokas'
          : 'Registration open for all'}
      </TableCell>
    </StripedTableRow>

    <StripedTableRow>
      <TableCell>Reg. end</TableCell>
      <TableCell>
        {new Date(competition.registrationEndDate).toLocaleString()}
      </TableCell>
    </StripedTableRow>

    <StripedTableRow>
      <TableCell>Start</TableCell>
      <TableCell>{new Date(competition.start).toLocaleString()}</TableCell>
    </StripedTableRow>

    <StripedTableRow>
      <TableCell>Approximate end</TableCell>
      <TableCell>{new Date(competition.end).toLocaleString()}</TableCell>
    </StripedTableRow>

    <StripedTableRow>
      <TableCell>Address</TableCell>
      <TableCell>{competition.location}</TableCell>
    </StripedTableRow>

    <StripedTableRow>
      <TableCell>Reg. Fee</TableCell>
      <TableCell>
        {competition.registrationFee}
        {competition.currency}
      </TableCell>
    </StripedTableRow>
  </Table>
);
export default CompetitionInformationTable;
