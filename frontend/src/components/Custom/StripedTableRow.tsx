import React from 'react';
import { TableRow, TableRowProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background: #d4d4d4;
  }
`;

const StripedTableRow: React.FC<TableRowProps> = ({ children, ...rest }) => (
  <StyledTableRow {...rest}>{children}</StyledTableRow>
);

export default StripedTableRow;
