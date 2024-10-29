/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useUser } from "../../Hooks/useUser";
import ContainerPaper from "../../Components/GeneralComponents/ContainerPaper/ContainerPaper";
import { scrollToTop } from "../../Utils/functions";
import { sendUserDeleteRequest } from "../../Functions/users";
import { useNavigate } from "react-router-dom";
import DeleteAccountPopup from "../../Components/ProfileComponents/DeleteAccountModal/DeleteAccountModal";
import NotificationPreferencesModal from "../../Components/ProfileComponents/NotificationPreferencesModal/NotificationPreferencesModal";
import AccountInfoForm from "../../Components/ProfileComponents/AccountInfoForm/AccountInfoForm";
import PersonalInfo from "../../Components/ProfileComponents/PersonalInfo/PersonalInfo";
// import BillingInfo from "../../Components/ProfileComponents/BillingInfo/BillingInfo";
import QuickActions from "../../Components/ProfileComponents/QuickActions/QuickActions";
import CurrentMembershipSection from "../../Components/ProfileComponents/CurrentMembershipSection/CurrentMembershipSection";
import AccountOptions from "../../Components/ProfileComponents/AccountOptions/AccountOptions";
import LoadingIcon from "../../Components/GeneralComponents/LoadingIcon/LoadingIcon";
import { enqueueSnackbar } from "notistack";
import ChangePasswordModal from "../../Components/ProfileComponents/ChangePasswordModal/ChangePasswordModal";

const Profile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, queryUser, logout } = useUser();
  const navigate = useNavigate();
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openNotificationPreferences, setOpenNotificationPreferences] =
    useState(false);
  const [preferences, setPreferences] = useState({
    email: true,
    push: false,
    sms: true,
  });

  const handleSavePreferences = (newPreferences: any) => {
    setPreferences(newPreferences);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    scrollToTop();
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const isValid = await queryUser();
      if (!isValid) {
        handleNavigation("/sign-in");
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    handleNavigation("/");
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await sendUserDeleteRequest();
      if (response?.status === 200) {
        enqueueSnackbar("Account deleted successfully", { variant: "success" });
        handleLogout();
      } else {
        console.error("Failed to delete account:", response?.statusText);
        enqueueSnackbar("Failed to delete account", { variant: "error" });
      }
    } catch (error) {
      console.error("An error occurred while deleting the account:", error);
      enqueueSnackbar("An error occurred while deleting the account", {
        variant: "error",
      });
    }
  };

  const handleChangePassword = async () => {
    console.log("Changing password");
  };

  if (isLoading) {
    return <LoadingIcon />;
  }

  return (
    <ContainerPaper>
      <DeleteAccountPopup
        open={openDeletePopup}
        onClose={() => setOpenDeletePopup(false)}
        onConfirm={handleDeleteAccount}
        username={user!.username}
      />
      <NotificationPreferencesModal
        open={openNotificationPreferences}
        onClose={() => setOpenNotificationPreferences(false)}
        onConfirm={handleSavePreferences}
        initialPreferences={preferences}
      />
      <ChangePasswordModal
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
        onConfirm={handleChangePassword}
      />
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <PersonalInfo />
          {/* <BillingInfo /> */}
          <QuickActions
            setOpenNotificationPreferences={setOpenNotificationPreferences}
            setOpenDeletePopup={setOpenDeletePopup}
            setOpenChangePassword={setOpenChangePassword}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <AccountInfoForm />
          <CurrentMembershipSection />
          <AccountOptions
            setOpenNotificationPreferences={setOpenNotificationPreferences}
            setOpenDeletePopup={setOpenDeletePopup}
            setOpenChangePassword={setOpenChangePassword}
          />
        </Grid>
      </Grid>
    </ContainerPaper>
  );
};

export default Profile;
