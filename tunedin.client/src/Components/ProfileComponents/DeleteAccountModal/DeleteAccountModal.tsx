import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface DeleteAccountPopupProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  username: string | undefined;
}

const DeleteAccountPopup: React.FC<DeleteAccountPopupProps> = ({
  open,
  onClose,
  onConfirm,
  username,
}) => {
  const [confirmUsername, setConfirmUsername] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (confirmUsername === username) {
      onConfirm();
      onClose();
    } else {
      setError("Username does not match. Please try again.");
    }
  };

  const handleClose = () => {
    onClose();
    setConfirmUsername("");
    setError("");
  };

  return (
    <Dialog open={open} onClose={handleClose} disableScrollLock>
      <DialogTitle>Confirm Account Deletion</DialogTitle>
      <DialogContent>
        <Typography variant="body1" className="mb-4">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </Typography>
        <Typography variant="body2" className="mb-2">
          Please enter your username '
          <Typography
            variant="body2"
            fontWeight="600"
            className="inline italic"
          >
            {username}
          </Typography>
          '' to confirm:
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          value={confirmUsername}
          onChange={(e) => setConfirmUsername(e.target.value)}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleConfirm} variant="contained" sx={{ bgColor: 'primary.main'}}>
          Delete Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccountPopup;
