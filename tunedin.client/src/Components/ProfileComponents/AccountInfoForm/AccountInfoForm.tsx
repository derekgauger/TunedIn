/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Grid, Paper, InputAdornment } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import ErrorMessage from "../../GeneralComponents/ErrorMessage/ErrorMessage";
import InputMask from "react-input-mask";
import { accountInfoSchema, initialAccountInfo } from "./validations";
import { parsePhoneNumber } from "../../../Utils/functions";
import { Save, VerifiedUser } from "@mui/icons-material";
import GenericTextField from "../../GeneralComponents/GenericTextField";
import GenericSectionText from "../../GeneralComponents/GenericSectionText";
import { User } from "../../../Utils/types";
import { DARK } from "../../../Utils/colors";
import { setEmailVerificationCode } from "../../../Functions/users";
import EmailVerificationDialog from "../../GeneralComponents/EmailVerificationCode/EmailVerificationCode";

interface AccountInfoFormProps {
  userDetails: User | undefined;
  updateAccountInformation: any;
  updateUserDetails: any;
}

const AccountInfoForm: React.FC<AccountInfoFormProps> = ({
  userDetails,
  updateAccountInformation,
  updateUserDetails,
}) => {
  const [openEmailVerification, setOpenEmailVerification] = useState(false);

  const compareBeforeAndAfter = (values: any) => {
    const phoneNumberValue = parsePhoneNumber(values.phoneNumber);
    if (
      values.firstName === userDetails?.firstName &&
      values.lastName === userDetails?.lastName &&
      values.username === userDetails?.username &&
      values.email === userDetails?.email &&
      phoneNumberValue === userDetails?.phoneNumber &&
      values.goal === userDetails?.goal
    ) {
      return false;
    }
    return true;
  };

  const handleSetEmailVerificationCode = async () => {
    if (!userDetails || userDetails.verifiedEmail) return;
    await setEmailVerificationCode(userDetails?.email);
    setOpenEmailVerification(true);
  };

  return (
    <Paper
      elevation={3}
      sx={{ p: 3, mb: 4, backgroundColor: DARK ? "secondary.light" : "#white" }}
    >
      <EmailVerificationDialog
        open={openEmailVerification}
        onClose={() => setOpenEmailVerification(false)}
        onConfirm={updateUserDetails}
        email={userDetails?.email}
      />
      <Formik
        initialValues={userDetails ?? initialAccountInfo}
        validationSchema={accountInfoSchema}
        onSubmit={updateAccountInformation}
      >
        {({ values, errors, touched, isValid, dirty }) => (
          <Form>
            <GenericSectionText text="Account Information" type="Header" />
            <Grid container spacing={1} mt={2}>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Field
                    as={GenericTextField}
                    fullWidth
                    name="firstName"
                    label="First Name"
                    error={touched.firstName && errors.firstName}
                    isDark={DARK}
                  />
                  <ErrorMessage error={touched.firstName && errors.firstName} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Field
                    as={GenericTextField}
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    error={touched.lastName && errors.lastName}
                    isDark={DARK}
                  />
                  <ErrorMessage error={touched.lastName && errors.lastName} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Field
                    as={GenericTextField}
                    fullWidth
                    name="username"
                    label="Username"
                    error={touched.username && errors.username}
                    isDark={DARK}
                  />
                  <ErrorMessage error={touched.username && errors.username} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Field
                    as={GenericTextField}
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    error={touched.email && errors.email}
                    isDark={DARK}
                    InputProps={{
                      endAdornment: userDetails &&
                        !userDetails.verifiedEmail && (
                          <InputAdornment position="end">
                            <Button
                              size="small"
                              variant="text"
                              sx={{
                                minWidth: "auto",
                                textTransform: "none",
                                color: DARK ? "primary.light" : "primary.main",
                              }}
                              startIcon={<VerifiedUser fontSize="small" />}
                              onClick={handleSetEmailVerificationCode}
                            >
                              Verify Email
                            </Button>
                          </InputAdornment>
                        ),
                    }}
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
                          <GenericTextField
                            {...inputProps}
                            type="tel"
                            label="Phone Number"
                            fullWidth
                            error={touched.phoneNumber && errors.phoneNumber}
                            isDark={DARK}
                            // InputProps={{
                            //   endAdornment: userDetails &&
                            //     !userDetails.verifiedPhone && (
                            //       <InputAdornment position="end">
                            //         <Button
                            //           size="small"
                            //           variant="text"
                            //           sx={{
                            //             minWidth: "auto",
                            //             textTransform: "none",
                            //             color: DARK
                            //               ? "primary.light"
                            //               : "primary.main",
                            //           }}
                            //           startIcon={
                            //             <VerifiedUser fontSize="small" />
                            //           }
                            //         >
                            //           Verify Phone
                            //         </Button>
                            //       </InputAdornment>
                            //     ),
                            // }}
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
                    as={GenericTextField}
                    fullWidth
                    name="goal"
                    label="Fitness Goal"
                    multiline
                    rows={3}
                    error={touched.goal && errors.goal}
                    isDark={DARK}
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
                sx={{
                  color: !(isValid && dirty && compareBeforeAndAfter(values))
                    ? "gray !important"
                    : "white !important",
                  outline: !(isValid && dirty && compareBeforeAndAfter(values))
                    ? "1px solid gray"
                    : "none",
                }}
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
