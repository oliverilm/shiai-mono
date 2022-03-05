import { Table, TableProps } from '@mui/material';
import React from 'react';

import useBreakpoints from 'hooks/useBreakpoints';

const ResponsiveTable: React.FC<TableProps> = ({ children }) => {
  const { isDownMD } = useBreakpoints();
  return (
    <Table
      sx={{
        margin: isDownMD ? '1rem' : 'auto',
        maxWidth: '650px',
      }}
    >
      {children}
    </Table>
  );
};

export default ResponsiveTable;
