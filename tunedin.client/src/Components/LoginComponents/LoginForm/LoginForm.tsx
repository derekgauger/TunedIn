import React, { useState } from "react";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { LoginSchema, ForgotPasswordSchema } from "../Validations";
import PasswordField from "../Password/PasswordField";
import ErrorMessage from "../../GeneralComponents/ErrorMessage/ErrorMessage";

interface LoginFormProps {
  handleSubmit: (values: any, { setSubmitting }: any) => void;
  handleForgotPassword: (values: any, { setSubmitting }: any) => void;
  triedSubmit: boolean;
  setTriedSubmit: any;
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleSubmit,
  handleForgotPassword,
  triedSubmit,
  setTriedSubmit,
}) => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    setTriedSubmit(false);
    setFormKey((prevKey) => prevKey + 1);
  };

  const handleClearForm = (resetForm: () => void) => {
    resetForm();
    setTriedSubmit(false);
    setFormKey((prevKey) => prevKey + 1);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "50%",
        height: "100%",
        transition: "left 0.2s ease-in-out",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100%",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {isForgotPassword ? "Forgot Password" : "Sign In"}
        </Typography>
        <Formik
          key={formKey}
          initialValues={
            isForgotPassword
              ? { email: "" }
              : { loginIdentifier: "", password: "" }
          }
          validationSchema={
            isForgotPassword ? ForgotPasswordSchema : LoginSchema
          }
          onSubmit={isForgotPassword ? handleForgotPassword : handleSubmit}
        >
          {({ values, errors, isSubmitting, resetForm }) => (
            <Form>
              {isForgotPassword ? (
                <>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    fullWidth
                    error={triedSubmit && errors.email}
                  />
                  <ErrorMessage error={triedSubmit && errors.email} />
                </>
              ) : (
                <>
                  <Field
                    as={TextField}
                    name="loginIdentifier"
                    label="Email or Username"
                    fullWidth
                    error={triedSubmit && errors.loginIdentifier}
                  />
                  <ErrorMessage error={triedSubmit && errors.loginIdentifier} />
                  <Field
                    name="password"
                    label="Password"
                    fullWidth
                    component={PasswordField}
                    error={triedSubmit && errors.password}
                  />
                  <ErrorMessage error={triedSubmit && errors.password} />
                </>
              )}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
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
                  {isForgotPassword ? "Reset Password" : "Sign In"}
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => handleClearForm(resetForm)}
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
        <Link
          component="button"
          variant="body2"
          onClick={toggleForgotPassword}
          sx={{ mt: 2, alignSelf: "flex-start" }}
        >
          {isForgotPassword ? "Back to Sign In" : "Forgot Password?"}
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
