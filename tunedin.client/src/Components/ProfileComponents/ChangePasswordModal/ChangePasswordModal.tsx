import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Box,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ open, onClose, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} disableScrollLock>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <WarningIcon color="warning" sx={{ mr: 1 }} />
          Change Password
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body1" gutterBottom>
            Changing your password is a sensitive action that affects your account security.
          </Typography>
          <Typography variant="body1" gutterBottom>
            If you proceed, we will send an email to the address currently on file with a link to reset your password.
          </Typography>
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            Warning: This action cannot be undone. Make sure you have access to your registered email address.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} variant="contained" sx={{ bgcolor: 'primary.main'}}>
          Send Password Reset Email
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordModal;