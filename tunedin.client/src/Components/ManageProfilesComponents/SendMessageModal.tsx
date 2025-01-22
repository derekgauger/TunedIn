import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React from "react";
import EmailForm from "../ContactPageSections/EmailForm";
import { User } from "../../Utils/types";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUser: User | undefined;
  onSendEmail: () => void;
}

const SendMessageModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  selectedUser,
  onSendEmail,
}) => {
  // Handler for backdrop click
  const handleBackdropClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiPaper-root": { bgcolor: "secondary.light" },
        "& .MuiDialog-backdrop": { cursor: "pointer" },
      }}
      onClick={handleBackdropClick}
    >
      <DialogTitle color="white" sx={{ m: 0, p: 2, position: "relative" }}>
        Message {selectedUser?.username}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="p-6">
        <EmailForm toEmail={selectedUser?.email} onSendEmail={onSendEmail} />
      </DialogContent>
    </Dialog>
  );
};

export default SendMessageModal;
