import React from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import { Field, Form, Formik } from "formik";
import PasswordField from "../Password/PasswordField";
import PasswordStrengthMeter from "../Password/PasswordStrengthMeter";
import { RegisterSchema } from "../Validations";
import ErrorMessage from "../../GeneralComponents/ErrorMessage/ErrorMessage";
import InputMask from "react-input-mask";

interface RegisterFormProps {
  handleSubmit: (values: any, { setSubmitting }: any) => void;
  triedSubmit: boolean;
  setTriedSubmit: any;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  handleSubmit,
  triedSubmit,
  setTriedSubmit,
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: "50%",
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
          Sign Up
        </Typography>
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
                    as={TextField}
                    name="firstName"
                    label="First Name"
                    fullWidth
                    error={triedSubmit && errors.firstName}
                  />
                  <ErrorMessage error={triedSubmit && errors.firstName} />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    error={triedSubmit && errors.lastName}
                  />
                  <ErrorMessage error={triedSubmit && errors.lastName} />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    name="username"
                    label="Username"
                    fullWidth
                    error={triedSubmit && errors.username}
                  />
                  <ErrorMessage error={triedSubmit && errors.username} />
                </Grid>
                <Grid item xs={6}>
                  <Field name="phoneNumber">
                    {({ field }) => (
                      <InputMask {...field} mask="(999) 999-9999" maskChar="">
                        {(inputProps) => (
                          <TextField
                            {...inputProps}
                            type="tel"
                            label="Phone Number"
                            fullWidth
                            error={triedSubmit && errors.phoneNumber}
                          />
                        )}
                      </InputMask>
                    )}
                  </Field>
                  <ErrorMessage error={triedSubmit && errors.phoneNumber} />
                </Grid>
              </Grid>
              <Field
                as={TextField}
                name="email"
                label="Email"
                fullWidth
                error={triedSubmit && errors.email}
              />
              <ErrorMessage error={triedSubmit && errors.email} />

              <Field
                name="password"
                label="Password"
                fullWidth
                component={PasswordField}
                error={triedSubmit && errors.password}
              />
              <ErrorMessage error={triedSubmit && errors.password} />

              <Field
                name="confirmPassword"
                label="Confirm Password"
                fullWidth
                component={PasswordField}
                error={triedSubmit && errors.confirmPassword}
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
      </Box>
    </Box>
  );
};

export default RegisterForm;
