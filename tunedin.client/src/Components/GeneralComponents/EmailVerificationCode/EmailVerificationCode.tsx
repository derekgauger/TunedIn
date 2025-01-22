import React, { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { verifyEmailCode, verifyEmailCodeAuth } from "../../../Functions/users";
import { enqueueSnackbar } from "notistack";
import GenericTextField from "../GenericTextField";
import { DARK } from "../../../Utils/colors";

interface VerificationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: any;
  email?: string;
  isAuth?: boolean;
}

const EmailVerificationDialog: React.FC<VerificationDialogProps> = ({
  open,
  onClose,
  email,
  onConfirm,
  isAuth,
}) => {
  const [code, setCode] = useState<string[]>(Array(8).fill(""));
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    if (!open) {
      setCode(Array(8).fill(""));
      setIsComplete(false);
    }
  }, [open]);

  React.useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const focusNextInput = (index: number) => {
    if (index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const focusPrevInput = (index: number) => {
    if (index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value !== "") {
        focusNextInput(index);
      }
      const completedCode = newCode.join("");
      setIsComplete(completedCode.length === 8);
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === "Backspace") {
      if (code[index] === "") {
        focusPrevInput(index);
      }
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
      setIsComplete(false);
    } else if (event.key === "ArrowLeft") {
      focusPrevInput(index);
    } else if (event.key === "ArrowRight") {
      focusNextInput(index);
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const pastedData = event.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "");
    if (pastedData.length === 8) {
      const newCode = pastedData.split("");
      setCode(newCode);
      inputs.current[5]?.focus();
      setIsComplete(true);
    }
  };

  const handleVerify = async () => {
    if (!isComplete || !email) return;

    setIsLoading(true);

    try {
      let response;
      if (isAuth) {
        response = await verifyEmailCodeAuth(email, code.join(""));
      } else {
        response = await verifyEmailCode(email, code.join(""));
      }

      if (response?.status !== 200) {
        enqueueSnackbar(response?.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Email verified successfully", { variant: "success" });
        onConfirm();
        onClose();
      }
    } catch (err) {
      enqueueSnackbar("An error occurred while verify your email", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={!isLoading ? onClose : undefined}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, backgroundColor: "secondary.light" },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" color={"white"}>
          Verify Your Email
        </Typography>
        {!isLoading && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ color: "grey.500" }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "center",
            pt: 2,
          }}
        >
          <Typography variant="body1" textAlign="center" color="white">
            {email
              ? `Please enter the 8-digit verification code sent to ${email}`
              : "Please enter the 8-digit verification code sent to your email"}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
            {code.map((digit, index) => (
              <GenericTextField
                key={index}
                inputRef={(el) => (inputs.current[index] = el)}
                value={digit}
                onChange={(e) =>
                  handleChange(index, e as React.ChangeEvent<HTMLInputElement>)
                }
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                disabled={isLoading}
                inputProps={{
                  maxLength: 1,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                isDark={DARK}
                autoFocus={index === 0 && open}
              />
            ))}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, flexDirection: "column", gap: 1 }}>
        <Button
          variant="contained"
          fullWidth
          disabled={!isComplete || isLoading}
          onClick={handleVerify}
          sx={{ height: 44, color: "white" }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Verify"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmailVerificationDialog;
