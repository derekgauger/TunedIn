import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

interface CancelMembershipModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: any;
  submitText: string;
  isRequest?: boolean;
}

const CancelMembershipPopup: React.FC<CancelMembershipModalProps> = ({
  open,
  onClose,
  onConfirm,
  submitText,
  isRequest,
}) => {
  const handleConfirm = () => {
    if (!isRequest) {
      onConfirm("None");
    } else {
      onConfirm();
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} disableScrollLock>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <WarningIcon color="warning" sx={{ mr: 1 }} />
          Cancel Membership
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {isRequest ? (
            <div>
              <Typography variant="body1" gutterBottom>
                Cancelling your membership is a sensitive action that affects
                your account status.
              </Typography>
              <Typography variant="body1" gutterBottom>
                If you proceed, we will notify a Tuned In Athlete Development
                admin to process your request. You are responsible for stopping
                any payments made.
              </Typography>
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                Warning: This action cannot be undone. You are responsible for
                stopping payments.
              </Typography>
            </div>
          ) : (
            <div>
              <Typography variant="body1" gutterBottom>
                You are cancelling this user's membership.
              </Typography>
              <Typography variant="body1" gutterBottom>
                If you proceed, the user will be notified of the cancellation.
              </Typography>
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                Warning: This action cannot be undone. The user will be
                notified.
              </Typography>
            </div>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          sx={{ bgcolor: "primary.main" }}
        >
          {submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CancelMembershipPopup;
