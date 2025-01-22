import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GenericTextField from "../../GeneralComponents/GenericTextField";
import { DARK } from "../../../Utils/colors";
import GenericSectionText from "../../GeneralComponents/GenericSectionText";
import { User } from "../../../Utils/types";
import { useUser } from "../../../Hooks/useUser";
import { enqueueSnackbar } from "notistack";
import PasswordField from "../../LoginComponents/Password/PasswordField";

interface DeleteAccountPopupProps {
  userDetails: User | undefined;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isAdminDelete?: boolean;
}

const DeleteAccountPopup: React.FC<DeleteAccountPopupProps> = ({
  userDetails,
  open,
  onClose,
  onConfirm,
  isAdminDelete,
}) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login } = useUser();

  const handleConfirm = async () => {
    if (isAdminDelete) {
      onConfirm();
      return;
    }
    if (!confirmPassword) {
      enqueueSnackbar("Please enter your password to confirm deletion.", {
        variant: "error",
      });
      return;
    }
    if (!userDetails) {
      enqueueSnackbar("Failed to get user details. Please try again later.", {
        variant: "error",
      });
      return;
    }
    const successfulLogin = await login(userDetails?.email, confirmPassword);
    if (!successfulLogin) {
      enqueueSnackbar("Incorrect password. Please try again.", {
        variant: "error",
      });
      return;
    } else {
      onConfirm();
    }
  };

  const handleClose = () => {
    onClose();
    setConfirmPassword("");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableScrollLock
      PaperProps={{
        sx: {
          bgcolor: "secondary.light",
        },
      }}
    >
      <DialogTitle color="white">Confirm Account Deletion</DialogTitle>
      <DialogContent>
        <GenericSectionText
          text="Are you sure you want to delete this account? This action cannot be
          undone."
          type="Description"
        />
        {!isAdminDelete && (
          <div>
            <Typography variant="body2" className="mb-" color={"white"}>
              Enter your password to confirm deletion:
            </Typography>
            <PasswordField
              field={GenericTextField}
              autoFocus
              fullWidth
              value={confirmPassword}
              onChange={(e: any) => setConfirmPassword(e.target.value)}
              isDark={DARK}
              sx={{ mt: 2 }}
            />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          sx={{
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          Delete Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccountPopup;
