/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Alert, Grid } from "@mui/material";
import { useUser } from "../../Hooks/useUser";
import ContainerPaper from "../../Components/GeneralComponents/ContainerPaper/ContainerPaper";
import { handleNavigation, parsePhoneNumber } from "../../Utils/functions";
import {
  sendChangePasswordRequest,
  sendGetUserByUsername,
  sendUserDeleteRequest,
  sendUserUpdateRequest,
} from "../../Functions/users";
import DeleteAccountPopup from "../../Components/ProfileComponents/DeleteAccountModal/DeleteAccountModal";
// import NotificationPreferencesModal from "../../Components/ProfileComponents/NotificationPreferencesModal/NotificationPreferencesModal";
import AccountInfoForm from "../../Components/ProfileComponents/AccountInfoForm/AccountInfoForm";
import PersonalInfo from "../../Components/ProfileComponents/PersonalInfo/PersonalInfo";
import QuickActions from "../../Components/ProfileComponents/QuickActions/QuickActions";
import CurrentMembershipSection from "../../Components/ProfileComponents/CurrentMembershipSection/CurrentMembershipSection";
import AccountOptions from "../../Components/ProfileComponents/AccountOptions/AccountOptions";
import LoadingIcon from "../../Components/GeneralComponents/LoadingIcon/LoadingIcon";
import { enqueueSnackbar } from "notistack";
import ChangePasswordModal from "../../Components/ProfileComponents/ChangePasswordModal/ChangePasswordModal";
import { User } from "../../Utils/types";
import { useLocation } from "react-router-dom";
import {
  getMembership,
  requestCancelMembership,
  requestChangeMembership,
} from "../../Functions/memberships";
import { sendTemplatedEmail } from "../../Functions/email";
import { SENDING_EMAIL, SENDING_PHONE } from "../../Constants/contactInfo";
import CancelMembershipPopup from "../../Components/ProfileComponents/CancelMembershipPopup";
import ChangeMembershipModal from "../../Components/ProfileComponents/ChangeMembershipModal";
import AdminQuickActions from "../../Components/ProfileComponents/QuickActions/AdminQuickActions";
import { FormikHelpers } from "formik";

interface ProfileProps {
  viewingAsAdmin?: boolean;
}

const Profile: React.FC<ProfileProps> = ({ viewingAsAdmin }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, queryUser, logout } = useUser();
  // Non-admin Modals
  const [
    openRequestChangeMembershipModal,
    setOpenRequestChangeMembershipModal,
  ] = useState(false);
  const [
    openRequestCancelMembershipPopup,
    setOpenRequestCancelMembershipPopup,
  ] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  // Admin Modals
  const [openChangeMembershipModal, setOpenChangeMembershipModal] =
    useState(false);
  const [openCancelMembershipPopup, setOpenCancelMembershipPopup] =
    useState(false);
  const [openAdminDeletePopup, setOpenAdminDeletePopup] = useState(false);

  const [openChangePassword, setOpenChangePassword] = useState(false);
  // const [openNotificationPreferences, setOpenNotificationPreferences] =
  useState(false);
  const [userDetails, setUserDetails] = useState<User | null>();
  const location = useLocation();

  useEffect(() => {
    const getCurrentUsername = () => {};
    getCurrentUsername();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (viewingAsAdmin) {
          const splitPath = location.pathname.split("/");
          const currentUsername = splitPath[splitPath.length - 1];
          const newUserDetails = await sendGetUserByUsername(currentUsername);
          if (newUserDetails) {
            const membership = await getMembership(
              newUserDetails.data.membership
            );
            newUserDetails.data.membershipData = membership?.data;
            setUserDetails(newUserDetails?.data);
          } else {
            enqueueSnackbar("Failed to load user details", {
              variant: "error",
            });
            handleNavigation("/");
          }
        } else {
          const isValid = await queryUser();
          if (!isValid) {
            handleNavigation("/sign-in");
          }
        }
      } catch (error) {
        handleNavigation("/");
        enqueueSnackbar("Failed to load user details", { variant: "error" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [location.pathname, viewingAsAdmin]);

  useEffect(() => {
    if (!viewingAsAdmin) {
      setUserDetails(user);
    }
  }, [user]);

  const updateAccountInformation = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>
  ) => {
    if (
      userDetails?.id !== undefined &&
      userDetails?.membership !== undefined
    ) {
      const response = await sendUserUpdateRequest(
        userDetails.id,
        values.firstName,
        values.lastName,
        values.username,
        values.email,
        parsePhoneNumber(values.phoneNumber),
        values.goal,
        userDetails.membership
      );
      if (response?.status !== 200) {
        enqueueSnackbar(response?.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Account information updated successfully", {
          variant: "success",
        });
      }
      getNewUserDetails(values.username);
    }
    setSubmitting(false);
  };

  const getNewUserDetails = async (username?: string) => {
    if (viewingAsAdmin) {
      if (!username) {
        enqueueSnackbar("Failed to update user details", { variant: "error" });
        return;
      }
      const newUserDetails = await sendGetUserByUsername(username);
      if (newUserDetails) {
        const membership = await getMembership(newUserDetails.data.membership);
        newUserDetails.data.membershipData = membership?.data;
      }
      setUserDetails(newUserDetails?.data);
    } else {
      await queryUser();
    }
  };

  const handleUpdateMembership = async (requestedMembership: string) => {
    if (!userDetails?.username) {
      enqueueSnackbar("Failed to update membership", { variant: "error" });
      return;
    }
    const response = await sendUserUpdateRequest(
      userDetails.id,
      userDetails.firstName,
      userDetails.lastName,
      userDetails.username,
      userDetails.email,
      userDetails.phoneNumber,
      userDetails.goal,
      requestedMembership
    );
    if (response?.status === 200) {
      enqueueSnackbar("Membership updated successfully", {
        variant: "success",
      });
      await getNewUserDetails(userDetails.username);
      if (requestedMembership === "None") {
        sendTemplatedEmail("membershipCancelled", userDetails.email, {
          Username: userDetails.username,
          Email: SENDING_EMAIL,
          PhoneNumber: SENDING_PHONE,
        });
      } else {
        sendTemplatedEmail("membershipChanged", userDetails.email, {
          Username: userDetails.username,
          OldMembership: userDetails?.membershipData?.title ?? "None",
          NewMembership: requestedMembership,
          Email: SENDING_EMAIL,
          PhoneNumber: SENDING_PHONE,
        });
      }
    } else {
      enqueueSnackbar(response?.data.message, { variant: "error" });
    }
  };

  const handleDeleteAccount = async () => {
    if (!userDetails?.username) {
      enqueueSnackbar("Failed to delete account", { variant: "error" });
      return;
    }
    const response = await sendUserDeleteRequest(userDetails?.username);
    if (response?.status === 200) {
      enqueueSnackbar("Account deleted successfully", { variant: "success" });
      if (!viewingAsAdmin) {
        logout();
      } else {
        handleNavigation("/manage-profiles");
      }
    } else {
      enqueueSnackbar(response?.data.message, { variant: "error" });
    }
  };

  const handleRequestChangeMembership = async (requestedMembership: string) => {
    if (userDetails) {
      await requestChangeMembership(userDetails, requestedMembership);
      await getNewUserDetails(userDetails.username);
    } else {
      enqueueSnackbar("Failed to request membership change", {
        variant: "error",
      });
    }
  };

  const handleRequestCancelMembership = async () => {
    if (userDetails) {
      await requestCancelMembership(userDetails);
      await getNewUserDetails(userDetails.username);
    } else {
      enqueueSnackbar("Failed to request membership cancellation", {
        variant: "error",
      });
    }
  };

  const handleChangePassword = async (values: any) => {
    if (userDetails) {
      const response = await sendChangePasswordRequest(
        values.currentPassword,
        values.newPassword,
        values.confirmNewPassword,
        userDetails.email
      );
      if (response?.status !== 200) {
        enqueueSnackbar(response?.data.message, { variant: "error" });
      }
      enqueueSnackbar("Password changed successfully", { variant: "success" });
      logout();
      handleNavigation("/sign-in");
    } else {
      enqueueSnackbar("Failed to change password", { variant: "error" });
    }
  };

  if (isLoading || !userDetails) {
    return <LoadingIcon />;
  }

  return (
    <ContainerPaper
      sx={{ mt: viewingAsAdmin ? { xs: 18, sm: 21, md: 18 } : 12 }}
    >
      {viewingAsAdmin && (
        <Alert
          severity="warning"
          sx={{
            mb: 3,
            justifyContent: "center",
            backgroundColor: "warning.main",
            color: "warning.contrastText",
            position: "fixed",
            top: { xs: "56px", sm: "80px" },
            zIndex: 1200,
            width: "100vw",
            left: 0,
            "& .MuiAlert-icon": {
              color: "warning.contrastText",
            },
          }}
        >
          You are viewing {userDetails?.username}'s profile as an administrator!
          You can do anything on this account that the user can do.
        </Alert>
      )}
      <DeleteAccountPopup
        userDetails={userDetails}
        open={openDeletePopup}
        onClose={() => setOpenDeletePopup(false)}
        onConfirm={handleDeleteAccount}
      />
      {viewingAsAdmin && (
        <DeleteAccountPopup
          userDetails={userDetails}
          open={openAdminDeletePopup}
          onClose={() => setOpenAdminDeletePopup(false)}
          onConfirm={handleDeleteAccount}
          isAdminDelete={true}
        />
      )}
      {/* <NotificationPreferencesModal
        open={openNotificationPreferences}
        onClose={() => setOpenNotificationPreferences(false)}
        onConfirm={handleSavePreferences}
        initialPreferences={preferences}
      /> */}
      <ChangePasswordModal
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
        onSubmit={handleChangePassword}
      />
      <ChangeMembershipModal
        open={openRequestChangeMembershipModal}
        onClose={() => setOpenRequestChangeMembershipModal(false)}
        onMembershipChange={handleRequestChangeMembership}
        currentMembership={userDetails.membershipData}
        submitText={
          userDetails?.membershipData
            ? "Request Membership Change"
            : "Request Membership"
        }
      />
      {viewingAsAdmin && (
        <ChangeMembershipModal
          open={openChangeMembershipModal}
          onClose={() => setOpenChangeMembershipModal(false)}
          onMembershipChange={handleUpdateMembership}
          currentMembership={userDetails.membershipData}
          submitText="Update Membership"
        />
      )}
      <CancelMembershipPopup
        open={openRequestCancelMembershipPopup}
        onClose={() => setOpenRequestCancelMembershipPopup(false)}
        onConfirm={handleRequestCancelMembership}
        submitText="Request Membership Cancellation"
        isRequest
      />
      {viewingAsAdmin && (
        <CancelMembershipPopup
          open={openCancelMembershipPopup}
          onClose={() => setOpenCancelMembershipPopup(false)}
          onConfirm={handleUpdateMembership}
          submitText="Cancel Membership"
        />
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <PersonalInfo userDetails={userDetails} />

          {viewingAsAdmin && (
            <AdminQuickActions
              userDetails={userDetails}
              setOpenChangeMembershipModal={setOpenChangeMembershipModal}
              setOpenCancelMembershipPopup={setOpenCancelMembershipPopup}
              setOpenDeletePopup={setOpenAdminDeletePopup}
            />
          )}
          <QuickActions
            userDetails={userDetails}
            // setOpenNotificationPreferences={setOpenNotificationPreferences}
            setOpenDeletePopup={setOpenDeletePopup}
            setOpenChangePassword={setOpenChangePassword}
            setOpenCancelMembershipPopup={setOpenRequestCancelMembershipPopup}
            setOpenChangeMembershipModal={setOpenRequestChangeMembershipModal}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <AccountInfoForm
            userDetails={userDetails}
            updateAccountInformation={updateAccountInformation}
            updateUserDetails={getNewUserDetails}
          />
          <CurrentMembershipSection
            userDetails={userDetails}
            openChangeMembershipModal={setOpenRequestChangeMembershipModal}
            openCancelMembershipPopup={setOpenRequestCancelMembershipPopup}
          />
          <AccountOptions
            setOpenDeletePopup={setOpenDeletePopup}
            setOpenChangePassword={setOpenChangePassword}
          />
        </Grid>
      </Grid>
    </ContainerPaper>
  );
};

export default Profile;
