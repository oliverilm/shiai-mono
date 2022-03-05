import { Box } from '@mui/material';
import React from 'react';

import useBreakpoints from 'hooks/useBreakpoints';

const PageWrapper: React.FC = ({ children }) => {
  const { isUpMD } = useBreakpoints();
  if (isUpMD) {
    return (
      <Box margin="2rem" sx={{ overflowX: 'hidden' }}>
        {children}
      </Box>
    );
  }
  return <Box margin=".5rem">{children}</Box>;
};

export default PageWrapper;
