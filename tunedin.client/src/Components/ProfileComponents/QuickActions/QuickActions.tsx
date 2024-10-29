import { Button, Paper, styled, Typography } from "@mui/material";
import React from "react";
import {
  CreditCard,
  NotificationsActive,
  Lock,
  Delete,
} from "@mui/icons-material";
import GenericSectionText from "../../GeneralComponents/GenericSectionText";

const QuickActionButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  width: "100%",
}));

interface QuickActionsProps {
  setOpenNotificationPreferences: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeletePopup: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  setOpenNotificationPreferences,
  setOpenDeletePopup,
  setOpenChangePassword,
}) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <GenericSectionText text="Quick Actions" type="Header" />
      <QuickActionButton
        variant="outlined"
        color="primary"
        startIcon={<CreditCard />}
        sx={{ mt: 2 }}
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
        onClick={() => setOpenChangePassword(true)}
      >
        Change Password
      </QuickActionButton>
      <QuickActionButton
        variant="outlined"
        color="primary"
        startIcon={<NotificationsActive />}
        onClick={() => setOpenNotificationPreferences(true)}
      >
        Notification Preferences
      </QuickActionButton>
      <QuickActionButton
        variant="outlined"
        color="error"
        startIcon={<Delete />}
        onClick={() => setOpenDeletePopup(true)}
      >
        Delete Account
      </QuickActionButton>
    </Paper>
  );
};

export default QuickActions;
