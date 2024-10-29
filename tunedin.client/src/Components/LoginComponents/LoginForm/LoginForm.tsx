import React, { useState } from "react";
import { Box, Button, IconButton, Link, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { LoginSchema, ForgotPasswordSchema } from "../Validations";
import PasswordField from "../Password/PasswordField";
import ErrorMessage from "../../GeneralComponents/ErrorMessage/ErrorMessage";
import GenericTextField from "../../GeneralComponents/GenericTextField";
import CustomTypography from "../../CustomUI/CustomTypography";
import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface LoginFormProps {
  handleSubmit: (values: any, { setSubmitting }: any) => void;
  handleForgotPassword: (values: any, { setSubmitting }: any) => void;
  triedSubmit: boolean;
  setTriedSubmit: any;
  isMobile: boolean;
  toggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleSubmit,
  handleForgotPassword,
  triedSubmit,
  setTriedSubmit,
  isMobile,
  toggleForm,
}) => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const navigate = useNavigate();

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
        width: isMobile ? "100%" : "50%",
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
        {isMobile && (
          <IconButton
            onClick={() => navigate("/")}
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              color: "primary.main",
            }}
          >
            <ArrowBackIcon />
            <Typography variant="body2" sx={{ ml: 1 }}>
              Back to site
            </Typography>
          </IconButton>
        )}
        <CustomTypography
          size={"3xl"}
          className="text-center mb-4"
          fontSizeOverrides={{
            xs: "3xl",
            sm: "3xl",
            md: "3xl",
            lg: "3xl",
            xl: "3xl",
            "2xl": "3xl",
          }}
        >
          {isForgotPassword ? "Forgot Password" : "Sign In"}
        </CustomTypography>
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
                    as={GenericTextField}
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
                    as={GenericTextField}
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            flexWrap: "wrap",
          }}
        >
          <Link
            component="button"
            variant="body2"
            onClick={toggleForgotPassword}
            sx={{ alignSelf: "flex-start" }}
          >
            {isForgotPassword ? "Back to Sign In" : "Forgot Password?"}
          </Link>
          {isMobile && (
            <Link
              component="button"
              variant="body2"
              onClick={toggleForm}
              sx={{ alignSelf: "flex-end" }}
            >
              Don't have an account?
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
