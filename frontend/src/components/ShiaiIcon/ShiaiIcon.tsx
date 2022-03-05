import React from 'react';
import { styled } from '@mui/material/styles';

import { iconValues, IconValueType } from '../../constants';

const StyledIcon = styled('div')<{
  $icon: string;
  $size: number;
  $color: string;
  $cursor: string;
}>`
  ::before {
    content: '\\${({ $icon }) => $icon}';
    font-size: ${({ $size }) => $size}px;
    font-family: Erply-Icons, serif;
    color: ${({ $color }) => $color};
    cursor: ${({ $cursor }) => $cursor};
    text-decoration: none;
  }
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  icon: IconValueType;
  size?: number;
  cursor?: string;
}

const ShiaiIcon: React.FC<Props> = ({ cursor, icon, size = 20, ...rest }) => (
  <StyledIcon
    $color={rest.color ?? 'black'}
    $icon={Number(iconValues[icon]).toString(16)}
    $size={size}
    $cursor={cursor ?? 'pointer'}
    {...rest}
  />
);

export default ShiaiIcon;
