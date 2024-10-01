import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Grid,
  Button,
  TextField,
  Typography,
  Paper,
  styled,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Save,
  CreditCard,
  NotificationsActive,
  Lock,
  Delete,
} from "@mui/icons-material";
import { useUser } from "../../Hooks/useUser";
import ContainerPaper from "../../Components/ContainerPaper/ContainerPaper";
import MembershipCard from "../../Components/MembershipCard/MembershipCard";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import { parsePhoneNumber } from "../../Utils/functions";
import { sendUserUpdateRequest } from "../../Functions/users";

const ErrorMessage: React.FC<{ error?: string }> = ({ error }) => (
  <Typography
    variant="caption"
    color="error"
    sx={{
      minHeight: "1.5em",
      display: "block",
      visibility: error ? "visible" : "hidden",
    }}
  >
    {error || " "}
  </Typography>
);

const QuickActionButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  width: "100%",
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: theme.spacing(4),
  color: theme.palette.primary.main,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: "100px",
}));

const Profile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, queryUser } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await queryUser();
      setIsLoading(false);
    };
    fetchData();
  }, []);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  

  const compareBeforeAndAfter = (values: any) => {
    const phoneNumberValue = parsePhoneNumber(values.phoneNumber);
    console.log("Form values:", values);
    console.log("User attributes:", user);
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

  const handleSaveChanges = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>
  ) => {
      if (user?.id !== undefined) {
        const response = await sendUserUpdateRequest(user.id, values.firstName, values.lastName, values.username, values.email, parsePhoneNumber(values.phoneNumber), values.goal);
      }
      setSubmitting(false);
      queryUser();
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string().matches(/^[0-9+\-() ]+$/, "Invalid phone number"),
    goal: Yup.string().required("Fitness goal is required"),
  });

  return (
    <ContainerPaper>
      <Grid container spacing={4}>
        {/* Left Column: Avatar, Personal Info, Quick Actions, and Billing Info */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Avatar
                src={user?.avatar}
                alt={`${user?.firstName} ${user?.lastName}`}
                sx={{ width: 150, height: 150, mb: 2 }}
              />
              <Button variant="outlined" component="label" sx={{ mb: 2 }}>
                Upload Picture
                <input type="file" hidden />
              </Button>
            </Box>
            <Typography variant="h5" gutterBottom>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Member since: {user?.createdAt}
            </Typography>
            <Typography variant="body1" paragraph>
              Goal: {user?.goal ? user?.goal : "No goal set"}
            </Typography>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Billing Information
            </Typography>
            <Typography variant="body2">
              Last Billing Date: May 1, 2023
            </Typography>
            <Typography variant="body2">
              Next Billing Date: June 1, 2023
            </Typography>
            <Typography variant="body2">Billing Amount: $19.99</Typography>
          </Paper>

          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <QuickActionButton
              variant="outlined"
              color="primary"
              startIcon={<CreditCard />}
            >
              Change Membership
            </QuickActionButton>
            <QuickActionButton
              variant="outlined"
              color="error"
              startIcon={<CreditCard />}
            >
              Cancel Membership
            </QuickActionButton>
            <QuickActionButton
              variant="outlined"
              color="primary"
              startIcon={<Lock />}
            >
              Change Password
            </QuickActionButton>
            <QuickActionButton
              variant="outlined"
              color="primary"
              startIcon={<NotificationsActive />}
            >
              Notification Preferences
            </QuickActionButton>
            <QuickActionButton
              variant="outlined"
              color="error"
              startIcon={<Delete />}
            >
              Delete Account
            </QuickActionButton>
          </Paper>
        </Grid>

        {/* Right Column: Account Details and Membership */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Formik
              initialValues={user}
              validationSchema={validationSchema}
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
                        <ErrorMessage
                          error={touched.firstName && errors.firstName}
                        />
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
                        <ErrorMessage
                          error={touched.lastName && errors.lastName}
                        />
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
                        <ErrorMessage
                          error={touched.username && errors.username}
                        />
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
                            <InputMask
                              {...field}
                              mask="(999) 999-9999"
                              maskChar=""
                            >
                              {(inputProps) => (
                                <TextField
                                  {...inputProps}
                                  type="tel"
                                  label="Phone Number"
                                  fullWidth
                                  error={
                                    touched.phoneNumber && errors.phoneNumber
                                  }
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

          {/* Membership and Disclaimer Section */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Box
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              {/* Current Membership */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Current Membership
                </Typography>
                {user?.membershipData ? (
                  <MembershipCard option={user?.membershipData} isCurrent />
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    You do not have a membership
                  </Typography>
                )}
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Button variant="contained" color="primary">
                  {user?.membershipData ? "Change Membership" : "Get Membership"}
                </Button>
                {user?.membershipData && (
                  <Button variant="outlined" color="error">
                    Cancel Membership
                  </Button>
                )}
              </Box>

              {/* Disclaimer */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  Disclaimer
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Please note that cancelling your membership may result in the
                  loss of your current benefits and progress. Membership changes
                  will take effect at the start of your next billing cycle. For
                  any questions regarding your membership, please contact our
                  support team.
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Account Options */}
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Account Options
            </Typography>
            <List>
              <ListItem>
                <StyledListItemIcon>
                  <Lock />
                </StyledListItemIcon>
                <ListItemText primary="Change Password" />
                <StyledButton variant="outlined" color="primary">
                  Change
                </StyledButton>
              </ListItem>
              <ListItem>
                <StyledListItemIcon>
                  <NotificationsActive />
                </StyledListItemIcon>
                <ListItemText primary="Notification Preferences" />
                <StyledButton variant="outlined" color="primary">
                  Manage
                </StyledButton>
              </ListItem>
              <ListItem>
                <StyledListItemIcon>
                  <Delete />
                </StyledListItemIcon>
                <ListItemText primary="Delete Account" />
                <StyledButton variant="outlined" color="error">
                  Delete
                </StyledButton>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </ContainerPaper>
  );
};

export default Profile;
