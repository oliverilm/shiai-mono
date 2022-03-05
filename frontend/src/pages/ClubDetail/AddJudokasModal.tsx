import React, { useState } from 'react';
import {
  Box,
  Button,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import ShiaiInput from '../../components/ShiaiInput';
import useBelts from '../../hooks/useBelts';
import { IJudokaCreate } from '../../@types/api-types';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { addJudokaThunk } from '../../redux/club/actions';

const AddJudokaModal: React.FC<{
  open: boolean;
  setOpen: (b: boolean) => void;
}> = ({ setOpen, open }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [belt, setBelt] = useState(1);
  const [birthDay, setBirthDay] = useState('');
  const [sex, setSex] = useState<'M' | 'F'>('M');
  const [idCode, setIdCode] = useState<string>('');

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useAppDispatch();

  const belts = useBelts();
  const club = useAppSelector((s) => s.user?.user?.profile.club);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (club) {
      const judoka: IJudokaCreate = {
        firstName,
        lastName,
        belt,
        birthDay,
        club,
        sex,
        idCode,
      };
      dispatch(addJudokaThunk({ judoka }));
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={submit}>
        <DialogTitle>Add new Judoka</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new judoka to the club. Please fill in the required
            information
          </DialogContentText>
          <Box display="flex" flexDirection="column" gap="1rem">
            <ShiaiInput
              value={idCode}
              onChange={(e) => setIdCode(e.target.value)}
              required
              helperText="ID code to associate the judoka to the actual user."
              label="ID Code"
            />
            <ShiaiInput
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              label="First Name"
            />
            <ShiaiInput
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              label="Surname"
            />
            <ShiaiInput
              value={sex}
              onChange={(e) => setSex(e.target.value as 'M' | 'F')}
              required
              label="Sex"
              select
            >
              <MenuItem value="M">M - (male)</MenuItem>
              <MenuItem value="F">F - (female)</MenuItem>
            </ShiaiInput>
            <ShiaiInput
              value={belt}
              onChange={(e) => setBelt(Number(e.target.value))}
              required
              label="Belt"
              select
            >
              {belts.map((b) => (
                <MenuItem key={b.id} value={b.id}>
                  {b.value} - ({b.color})
                </MenuItem>
              ))}
            </ShiaiInput>
            <ShiaiInput
              onChange={(e) => setBirthDay(e.target.value)}
              required
              type="date"
            />
            <ShiaiInput label="Licence nr (optional)" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddJudokaModal;
