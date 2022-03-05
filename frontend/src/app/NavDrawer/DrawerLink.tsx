import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface DrawerLinkProps {
  icon: JSX.Element;
  name: string;
  to: string;
}

const DrawerLink: React.FC<DrawerLinkProps> = ({
  icon,
  name,
  to,
}): JSX.Element => (
  <ListItem button component={Link} to={to} key={name}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={name} />
  </ListItem>
);

export default DrawerLink;
