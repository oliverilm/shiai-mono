import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

type Props = {
  width?: string;
} & TextFieldProps;

const ShiaiInput: React.FC<Props> = ({ width = 'auto', ...rest }) => (
  <TextField
    sx={{ width: width ?? 'auto' }}
    variant="outlined"
    size="small"
    {...rest}
  />
);

export default ShiaiInput;
