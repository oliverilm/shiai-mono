import React from 'react';
import { Avatar, useTheme } from '@mui/material';

type Props = {
  src: string;
  size?: number;
};

const ProfileAvatar: React.FC<Props> = ({ src }) => {
  const theme = useTheme();
  return (
    <Avatar
      alt="image"
      src={src}
      sx={{ width: theme.spacing(30), height: theme.spacing(30) }}
    />
  );
};

export default ProfileAvatar;
