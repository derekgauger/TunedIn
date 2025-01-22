import { Button, Paper, styled } from "@mui/material";
import React from "react";
import {
  CreditCard,
  Lock,
  Delete,
} from "@mui/icons-material";
import GenericSectionText from "../../GeneralComponents/GenericSectionText";
import { DARK } from "../../../Utils/colors";
import { User } from "../../../Utils/types";
import { checkIfOccurredInLast24Hours } from "../../../Utils/functions";

const QuickActionButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  width: "100%",
}));

interface QuickActionsProps {
  userDetails: User | undefined;
  // setOpenNotificationPreferences: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeletePopup: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenChangeMembershipModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenCancelMembershipPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  userDetails,
  // setOpenNotificationPreferences,
  setOpenDeletePopup,
  setOpenChangePassword,
  setOpenChangeMembershipModal,
  setOpenCancelMembershipPopup,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{ p: 3, backgroundColor: DARK ? "secondary.light" : "white" }}
    >
      <GenericSectionText text="Quick Actions" type="Header" className="mb-4" />
      {!checkIfOccurredInLast24Hours(
        userDetails?.latestChangeMembershipRequest
      ) && (
        <div>
          <QuickActionButton
            variant="outlined"
            color="primary"
            startIcon={<CreditCard />}
            onClick={() => setOpenChangeMembershipModal(true)}
          >
            {userDetails?.membershipData
              ? "Request Membership Change"
              : "Request Membership"}
          </QuickActionButton>
          {userDetails?.membershipData && (
            <QuickActionButton
              variant="outlined"
              color="error"
              startIcon={<CreditCard />}
              onClick={() => setOpenCancelMembershipPopup(true)}
            >
              Request Membership Cancellation
            </QuickActionButton>
          )}
        </div>
      )}
      <QuickActionButton
        variant="outlined"
        color="primary"
        startIcon={<Lock />}
        onClick={() => setOpenChangePassword(true)}
      >
        Change Password
      </QuickActionButton>
      {/* <QuickActionButton
        variant="outlined"
        color="primary"
        startIcon={<NotificationsActive />}
        onClick={() => setOpenNotificationPreferences(true)}
      >
        Notification Preferences
      </QuickActionButton> */}
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
