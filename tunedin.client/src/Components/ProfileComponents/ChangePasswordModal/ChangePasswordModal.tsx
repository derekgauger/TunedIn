import React from "react";
import { Button, Dialog, DialogContent, DialogTitle, Box } from "@mui/material";
import { Field, Form, Formik } from "formik";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorMessage from "../../GeneralComponents/ErrorMessage/ErrorMessage";
import GenericSectionText from "../../GeneralComponents/GenericSectionText";
import { DARK } from "../../../Utils/colors";
import PasswordStrengthMeter from "../../LoginComponents/Password/PasswordStrengthMeter";
import PasswordField from "../../LoginComponents/Password/PasswordField";
import { ChangePasswordSchema, ForgotPasswordSchema } from "./validations";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: ChangePasswordValues) => void;
  isForgotPassword?: boolean;
  email?: string;
}

interface ChangePasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  email?: string;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  open,
  onClose,
  onSubmit,
  isForgotPassword,
  email,
}) => {
  const [triedSubmit, setTriedSubmit] = React.useState(false);

  const handleSubmit = async (
    values: ChangePasswordValues,
    { setSubmitting }: any
  ) => {
    await onSubmit(values);
    setSubmitting(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableScrollLock
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "secondary.light",
          minHeight: "fit-content",
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" mb={2}>
          <WarningIcon color="warning" sx={{ mr: 1 }} />
          <GenericSectionText type="Header" text="Change Password" />
        </Box>
      </DialogTitle>
      <DialogContent>
        {!isForgotPassword ? (
          <GenericSectionText
            type="Description"
            text="Changing your password is a sensitive action that affects your account security. 
          Please enter your current password and choose a strong new password."
            className="mb-4"
          />
        ) : (
          <GenericSectionText
            type="Description"
            text="Changing your password is a sensitive action that affects your account security."
            className="mb-4"
          />
        )}

        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
            email: email,
          }}
          validationSchema={
            isForgotPassword ? ForgotPasswordSchema : ChangePasswordSchema
          }
          onSubmit={handleSubmit}
        >
          {({ errors, isSubmitting, values, resetForm }) => (
            <Form>
              {!isForgotPassword && (
                <div>
                  <Field
                    name="currentPassword"
                    label="Current Password"
                    fullWidth
                    component={PasswordField}
                    error={triedSubmit && errors.currentPassword}
                    isDark={DARK}
                  />
                  <ErrorMessage error={triedSubmit && errors.currentPassword} />
                </div>
              )}

              <Field
                name="newPassword"
                label="New Password"
                fullWidth
                component={PasswordField}
                error={triedSubmit && errors.newPassword}
                isDark={DARK}
                sx={{ mt: 1 }}
              />
              <ErrorMessage error={triedSubmit && errors.newPassword} />

              <Field
                name="confirmNewPassword"
                label="Confirm New Password"
                fullWidth
                component={PasswordField}
                error={triedSubmit && errors.confirmNewPassword}
                isDark={DARK}
                sx={{ mt: 1 }}
              />
              <ErrorMessage error={triedSubmit && errors.confirmNewPassword} />

              <PasswordStrengthMeter password={values.newPassword} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 3,
                  mb: 2,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    bgcolor: "primary.main",
                    "&:hover": { bgcolor: "primary.dark" },
                    flex: 1,
                    mr: 1,
                  }}
                  onClick={() => setTriedSubmit(true)}
                >
                  Change Password
                </Button>
                <Button
                  onClick={() => {
                    resetForm();
                    setTriedSubmit(false);
                  }}
                  variant="outlined"
                  sx={{
                    borderColor: "primary.main",
                    color: "primary.main",
                    "&:hover": {
                      borderColor: "primary.dark",
                      color: "primary.dark",
                    },
                    flex: 1,
                    ml: 1,
                  }}
                >
                  Clear Form
                </Button>
              </Box>
            </Form>
          )}
        </Formik>

        <GenericSectionText
          type="Description"
          text="Note: After changing your password, you will need to log in again with your new password."
          className="mt-2"
          colorOverride="warning"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
