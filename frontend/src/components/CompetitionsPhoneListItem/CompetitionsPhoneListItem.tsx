import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Room } from '@mui/icons-material';

import { ICompetition } from '../../@types/api-types';

type Props = {
  competition: ICompetition;
  isAuthenticated: boolean;
};

const CompetitionsPhoneListItem: React.FC<Props> = ({ competition }) => {
  const navigate = useNavigate();

  return (
    <ListItem
      alignItems="flex-start"
      onClick={() => navigate(`/competitions/${competition.slug}`)}
    >
      <ListItemAvatar>
        <Avatar
          variant="square"
          alt={competition.name}
          src={
            competition.image ??
            `https://avatars.dicebear.com/api/jdenticon/${competition.uuid}.svg`
          }
        />
      </ListItemAvatar>
      <ListItemText
        primary={`${competition.name}`}
        secondary={
          <>
            <Typography
              component="span"
              variant="body2"
              sx={{ display: 'inline' }}
              color="textPrimary"
            >
              {new Date(competition.start).toDateString()}
            </Typography>
            {' — '} <Room /> {competition.location}
          </>
        }
      />
    </ListItem>
  );
};

export default CompetitionsPhoneListItem;
