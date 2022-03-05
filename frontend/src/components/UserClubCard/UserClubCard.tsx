import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import ShiaiIcon from 'components/ShiaiIcon';

import usePermissions from '../../hooks/usePermissions';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { pendingActionThunk } from '../../redux/club/actions';
import UsersPendingInClub from './UsersPendingInClub';
import JoinClubPopup from './JoinClubPopup';

const StyledIconButtonWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CustomMenuIcon: React.FC<{
  icon: JSX.Element;
  text: string;
  onClick?: () => void;
  link?: string;
}> = ({ icon, link, text, onClick }) =>
  link ? (
    <Link to={link}>
      <MenuItem onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </MenuItem>
    </Link>
  ) : (
    <MenuItem onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </MenuItem>
  );

const UserClubCard: React.FC = () => {
  const clubSlug = useAppSelector((s) => s.user?.user?.profile.club);
  const club = useAppSelector((s) =>
    s.clubs.clubs.find((cl) => cl.uuid === clubSlug),
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { isPending } = usePermissions();
  const dispatch = useAppDispatch();
  const pending = useAppSelector((s) => s.user?.user?.profile.pending);
  const cancelPending = () => {
    if (pending) {
      dispatch(pendingActionThunk({ pending, action: 'declineSelf' }));
    }
  };

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isPending) {
    return (
      <Box display="flex" gap="1rem" height="auto" alignItems="center">
        <div>Pending request waiting for approval</div>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={cancelPending}
        >
          Cancel
        </Button>
      </Box>
    );
  }

  return club ? (
    <Paper
      elevation={3}
      sx={{ width: '600px', height: '9rem', padding: '.5rem' }}
    >
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" marginBottom=".5em" alignItems="center" gap="1rem">
          <Box>
            <Avatar
              src={
                club.image ??
                `https://avatars.dicebear.com/api/jdenticon/${club.uuid}.svg`
              }
            />
          </Box>

          <Typography variant="subtitle1">{club.name}</Typography>
        </Box>

        <Box display="flex">
          <IconButton>
            <ShiaiIcon icon="Info" />
          </IconButton>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <ShiaiIcon icon="More-Vertical" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
          >
            <CustomMenuIcon
              icon={<ShiaiIcon icon="Document-Sheet" />}
              text="View Details"
              link={`/clubs/${club.slug}`}
            />
            <CustomMenuIcon
              icon={<ShiaiIcon icon="Sign-Out" />}
              text="Leave club"
            />
            <CustomMenuIcon
              onClick={() => {} /* deleteClub(club.slug) */}
              icon={<ShiaiIcon icon="Delete" />}
              text="Delete club"
            />
          </Menu>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Box display="flex" justifyContent="space-around" marginTop=".5rem">
          <IconButton>
            <StyledIconButtonWrapper>
              <ShiaiIcon icon="Person-2-Group" />
              <div style={{ fontSize: 12 }}>{club.membersAmount}</div>
            </StyledIconButtonWrapper>
          </IconButton>

          <IconButton>
            <StyledIconButtonWrapper>
              <ShiaiIcon icon="Calendar" />
              <div style={{ fontSize: 12 }}>
                {club.createdCompetitionsAmount}
              </div>
            </StyledIconButtonWrapper>
          </IconButton>

          <IconButton>
            <StyledIconButtonWrapper>
              <ShiaiIcon icon="Person-1-Group" />
              <div style={{ fontSize: 12 }}>{club.judokaAmount}</div>
            </StyledIconButtonWrapper>
          </IconButton>
        </Box>
      </Box>
      <UsersPendingInClub />
    </Paper>
  ) : (
    <div>{isPending ? <div>pending in club</div> : <JoinClubPopup />}</div>
  );
};

export default UserClubCard;
