import { useTheme, useMediaQuery } from '@mui/material';

interface MediaReturn {
  isDownMD: boolean;
  isUpMD: boolean;
  isDownSM: boolean;
  isUpSM: boolean;
  isDownLG: boolean;
  isUpLG: boolean;
}

const useBreakpoints = (): MediaReturn => {
  const theme = useTheme();
  const isDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const isUpMD = useMediaQuery(theme.breakpoints.up('md'));

  const isDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const isUpSM = useMediaQuery(theme.breakpoints.up('sm'));

  const isDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const isUpLG = useMediaQuery(theme.breakpoints.up('lg'));

  return {
    isDownMD,
    isUpMD,
    isDownSM,
    isUpSM,
    isDownLG,
    isUpLG,
  };
};

export default useBreakpoints;
