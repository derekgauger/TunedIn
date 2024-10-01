/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import ErrorMessage from "../../GeneralComponents/ErrorMessage/ErrorMessage";
import InputMask from "react-input-mask";
import { useUser } from "../../../Hooks/useUser";
import { accountInfoSchema } from "./validations";
import { sendUserUpdateRequest } from "../../../Functions/users";
import { parsePhoneNumber } from "../../../Utils/functions";
import { Save } from "@mui/icons-material";

interface AccountInfoFormProps {}

const AccountInfoForm: React.FC<AccountInfoFormProps> = () => {
  const { user, queryUser } = useUser();

  const handleSaveChanges = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>
  ) => {
    if (user?.id !== undefined) {
      const response = await sendUserUpdateRequest(
        user.id,
        values.firstName,
        values.lastName,
        values.username,
        values.email,
        parsePhoneNumber(values.phoneNumber),
        values.goal
      );
    }
    setSubmitting(false);
    queryUser();
  };

  const compareBeforeAndAfter = (values: any) => {
    const phoneNumberValue = parsePhoneNumber(values.phoneNumber);
    if (
      values.firstName === user?.firstName &&
      values.lastName === user?.lastName &&
      values.username === user?.username &&
      values.email === user?.email &&
      phoneNumberValue === user?.phoneNumber &&
      values.goal === user?.goal
    ) {
      return false;
    }
    return true;
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Formik
        initialValues={user}
        validationSchema={accountInfoSchema}
        onSubmit={handleSaveChanges}
      >
        {({ values, errors, touched, isValid, dirty }) => (
          <Form>
            <Typography variant="h6" gutterBottom>
              Account Information
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Field
                    as={TextField}
                    fullWidth
                    name="firstName"
                    label="First Name"
                    error={touched.firstName && errors.firstName}
                  />
                  <ErrorMessage error={touched.firstName && errors.firstName} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Field
                    as={TextField}
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    error={touched.lastName && errors.lastName}
                  />
                  <ErrorMessage error={touched.lastName && errors.lastName} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Field
                    as={TextField}
                    fullWidth
                    name="username"
                    label="Username"
                    error={touched.username && errors.username}
                  />
                  <ErrorMessage error={touched.username && errors.username} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Field
                    as={TextField}
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    error={touched.email && errors.email}
                  />
                  <ErrorMessage error={touched.email && errors.email} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Field name="phoneNumber">
                    {({ field }) => (
                      <InputMask {...field} mask="(999) 999-9999" maskChar="">
                        {(inputProps) => (
                          <TextField
                            {...inputProps}
                            type="tel"
                            label="Phone Number"
                            fullWidth
                            error={touched.phoneNumber && errors.phoneNumber}
                          />
                        )}
                      </InputMask>
                    )}
                  </Field>
                  <ErrorMessage
                    error={touched.phoneNumber && errors.phoneNumber}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Field
                    as={TextField}
                    fullWidth
                    name="goal"
                    label="Fitness Goal"
                    multiline
                    rows={3}
                    error={touched.goal && errors.goal}
                  />
                  <ErrorMessage error={touched.goal && errors.goal} />
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Save />}
                disabled={!(isValid && dirty && compareBeforeAndAfter(values))}
              >
                Save Changes
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default AccountInfoForm;
