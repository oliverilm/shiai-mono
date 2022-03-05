import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { AppRoute } from 'app/routes/AppRoute.enum';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { IClub } from '../../@types/api-types';
import { joinClubThunk } from '../../redux/club/actions';

const JoinClubPopup: React.FC = () => {
  const { clubs } = useAppSelector((s) => s.clubs);
  const [open, setOpen] = useState(false);
  const [searchString, setSearchString] = useState('');
  const dispatch = useAppDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const join = (club: IClub) => {
    dispatch(joinClubThunk({ club }));
    handleClose();
  };

  return (
    <>
      <Button onClick={handleClickOpen}>Join a club</Button>

      <Dialog
        sx={{ position: 'absolute', top: 50 }}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Box display="flex" justifyContent="space-between">
            <div>Join a club</div>
            <Button
              component={Link}
              to={AppRoute.clubs_create}
              variant="outlined"
              size="small"
              color="primary"
            >
              Create new
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Search for a club to join with. If no club is found, you can create
            it yourself or let your coach create it.
          </DialogContentText>
          <DialogContentText>
            <i>NB: Clubs with wrongful owners will be deleted</i>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            placeholder="Club Name"
            variant="outlined"
            label="Search for a club"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            fullWidth
          />
          <Box maxHeight="400px" className="overflow-y-scroll">
            {searchString.length > 0 &&
              clubs
                .filter((cl) =>
                  cl.name.toLowerCase().includes(searchString.toLowerCase()),
                )
                .map((club) => (
                  <Box
                    paddingY=".5rem"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom="1px solid #ccc"
                  >
                    <Box>{club.name}</Box>
                    <Box>
                      <Button color="primary" onClick={() => join(club)}>
                        Join
                      </Button>
                    </Box>
                  </Box>
                ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default JoinClubPopup;
