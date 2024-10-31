import React from "react";
import { Box, Button, Typography, Grid, Link, IconButton } from "@mui/material";
import { Field, Form, Formik } from "formik";
import PasswordField from "../Password/PasswordField";
import PasswordStrengthMeter from "../Password/PasswordStrengthMeter";
import { RegisterSchema } from "../Validations";
import ErrorMessage from "../../GeneralComponents/ErrorMessage/ErrorMessage";
import InputMask from "react-input-mask";
import GenericTextField from "../../GeneralComponents/GenericTextField";
import CustomTypography from "../../CustomUI/CustomTypography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { handleNavigation } from "../../../Utils/functions";
import { DARK } from "../../../Utils/colors";

interface RegisterFormProps {
  handleSubmit: (values: any, { setSubmitting }: any) => void;
  triedSubmit: boolean;
  setTriedSubmit: any;
  isMobile: boolean;
  toggleForm: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  handleSubmit,
  triedSubmit,
  setTriedSubmit,
  isMobile,
  toggleForm,
}) => {

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: isMobile ? "0%" : "50%",
        width: isMobile ? "100%" : "50%",
        height: "100%",
        transition: "left 0.2s ease-in-out",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        zIndex: 1,
        bgcolor: DARK ? "secondary.light" : "white",
      }}
    >
      {isMobile && (
        <IconButton
          onClick={() => handleNavigation("/")}
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
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100%",
        }}
      >
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
          color="white"
        >
          Register Account
        </CustomTypography>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, isSubmitting, values, resetForm }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field
                    as={GenericTextField}
                    name="firstName"
                    label="First Name"
                    fullWidth
                    error={triedSubmit && errors.firstName}
                    isDark={DARK}
                  />
                  <ErrorMessage error={triedSubmit && errors.firstName} />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={GenericTextField}
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    error={triedSubmit && errors.lastName}
                    isDark={DARK}
                  />
                  <ErrorMessage error={triedSubmit && errors.lastName} />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field
                    as={GenericTextField}
                    name="username"
                    label="Username"
                    fullWidth
                    error={triedSubmit && errors.username}
                    isDark={DARK}
                  />
                  <ErrorMessage error={triedSubmit && errors.username} />
                </Grid>
                <Grid item xs={6}>
                  <Field name="phoneNumber">
                    {({ field }: { field: any }) => (
                      <InputMask {...field} mask="(999) 999-9999" maskChar="">
                        {(inputProps: any) => (
                          <GenericTextField
                            {...inputProps}
                            type="tel"
                            label="Phone Number"
                            fullWidth
                            error={triedSubmit && errors.phoneNumber}
                            isDark={DARK}
                          />
                        )}
                      </InputMask>
                    )}
                  </Field>
                  <ErrorMessage error={triedSubmit && errors.phoneNumber} />
                </Grid>
              </Grid>
              <Field
                as={GenericTextField}
                name="email"
                label="Email"
                fullWidth
                error={triedSubmit && errors.email}
                isDark={DARK}
              />
              <ErrorMessage error={triedSubmit && errors.email} />

              <Field
                name="password"
                label="Password"
                fullWidth
                component={PasswordField}
                error={triedSubmit && errors.password}
                isDark={DARK}
              />
              <ErrorMessage error={triedSubmit && errors.password} />

              <Field
                name="confirmPassword"
                label="Confirm Password"
                fullWidth
                component={PasswordField}
                error={triedSubmit && errors.confirmPassword}
                isDark={DARK}
              />
              <ErrorMessage error={triedSubmit && errors.confirmPassword} />

              <PasswordStrengthMeter password={values.password} />
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
                  Sign Up
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => {
                    resetForm();
                    setTriedSubmit(false);
                  }}
                  sx={{
                    borderColor: "primary.main",
                    color: "primary.main",
                    "&:hover": {
                      borderColor: "primary.dark)",
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
        {isMobile && (
          <Box sx={{ mt: 2 }}>
            <Link
              component="button"
              variant="body2"
              onClick={toggleForm}
              sx={{ alignSelf: "flex-start" }}
            >
              Have an account already?
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RegisterForm;
