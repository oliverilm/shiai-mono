import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
} from '@mui/material';

import { useAppSelector } from '../../hooks/useRedux';
import ShiaiInput from '../../components/ShiaiInput';
import API from '../../API';
import useCountries from '../../hooks/useCountries';

const UserProfileDataForm: React.FC = () => {
  const { user } = useAppSelector((s) => s.user);
  const countries = useCountries();

  const initialData = {
    firstName: user?.profile.judoka?.firstName ?? '',
    lastName: user?.profile.judoka?.lastName ?? '',
    sex: user?.profile.judoka?.sex ?? '',
    birthDay: user?.profile.judoka?.birthDay ?? '',
    idCode: user?.profile.judoka?.idCode ?? '',
    country: user?.profile.country ?? '',
  };

  const [open, setOpen] = React.useState(true);
  const [data, setData] = useState(initialData);

  const save = () => {
    API.auth.update(data);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open}>
      <form onSubmit={save}>
        <DialogTitle>Tell us a few details about you.</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in your details. This information is used to construct
            your online judo-passport. This is the information used to register
            yourself to competitions.
          </DialogContentText>
          <Box display="flex" flexDirection="column" gap="1rem">
            <ShiaiInput
              value={data.idCode}
              onChange={(e) => setData({ ...data, idCode: e.target.value })}
              helperText="Id Code will help us later determine your identity and connect your judo passport with your account."
              label="ID Code"
              required
            />
            <ShiaiInput
              value={data.country}
              onChange={(e) => setData({ ...data, country: e.target.value })}
              helperText="This will categorize you to the correct union."
              label="Country"
              required
              select
            >
              {countries.map((c) => (
                <MenuItem value={c.id}>{c.name}</MenuItem>
              ))}
            </ShiaiInput>

            <ShiaiInput
              value={data.firstName}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
              required
              label="First name"
            />
            <ShiaiInput
              value={data.lastName}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
              required
              label="Last name"
            />
            <ShiaiInput
              value={data.birthDay}
              onChange={(e) => setData({ ...data, birthDay: e.target.value })}
              helperText="Date of birth"
              required
              type="date"
            />
            <RadioGroup
              value={data.sex}
              onChange={(e) => setData({ ...data, sex: e.target.value })}
            >
              <FormControlLabel value="M" control={<Radio />} label="Male" />
              <FormControlLabel value="W" control={<Radio />} label="Female" />
            </RadioGroup>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserProfileDataForm;
