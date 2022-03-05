import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

const ImportJudokasModal: React.FC<{
  open: boolean;
  setOpen: (b: boolean) => void;
}> = ({ setOpen, open }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        Import judokas from text file
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          This feature is not available yet.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImportJudokasModal;
