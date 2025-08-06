import React, { useState, useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

type QuerySaveDialogProps = {
  open: boolean;
  onClose: () => void;
  onSave: (queryName: string) => void;
};

export default function QuerySaveDialog(props: QuerySaveDialogProps) {
  const { open, onClose, onSave } = props;
  const [queryName, setQueryName] = useState('');
  const [isQueryNameError, setIsQueryNameError] = useState(false);

  const handleSave = useCallback(() => {
    if (!queryName) {
      setIsQueryNameError(true);
      return;
    }
    onSave(queryName);
    onClose();
  }, [queryName, onSave, onClose]);

  const handleQueryNameChange = useCallback((event) => {
    const regex = /^[a-zA-Z0-9_-]{0,30}$/;
    if (!regex.test(event.target.value)) {
      setIsQueryNameError(true);
      return;
    }
    setQueryName(event.target.value);
    setIsQueryNameError(false);
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Save Query</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Query Name"
          type="text"
          fullWidth
          value={queryName}
          onChange={handleQueryNameChange}
          error={isQueryNameError}
          helperText={isQueryNameError ? 'Only English letters, numbers, and _- are allowed' : ''}
        />
        <Typography variant="body2" color="textSecondary">
          {queryName.length}/30
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setQueryName('');
            onClose();
          }}
          color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
