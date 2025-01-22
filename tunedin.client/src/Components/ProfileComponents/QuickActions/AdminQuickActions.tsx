import { Button, Paper, styled } from "@mui/material";
import React from "react";
import { CreditCard } from "@mui/icons-material";
import GenericSectionText from "../../GeneralComponents/GenericSectionText";
import { DARK } from "../../../Utils/colors";
import { User } from "../../../Utils/types";
import DeleteIcon from "@mui/icons-material/Delete";

const QuickActionButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  width: "100%",
}));

interface AdminQuickActionsProps {
  userDetails: User | undefined;
  setOpenChangeMembershipModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenCancelMembershipPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeletePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminQuickActions: React.FC<AdminQuickActionsProps> = ({
  userDetails,
  setOpenChangeMembershipModal,
  setOpenCancelMembershipPopup,
  setOpenDeletePopup,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{ p: 3, backgroundColor: DARK ? "secondary.light" : "white", mb: 4 }}
    >
      <GenericSectionText
        text="Admin Specific Quick Actions"
        type="Header"
        className="mb-4"
      />
      <QuickActionButton
        variant="outlined"
        color="primary"
        startIcon={<CreditCard />}
        onClick={() => setOpenChangeMembershipModal(true)}
      >
        Update User's Membership
      </QuickActionButton>
      {userDetails?.membershipData && (
        <QuickActionButton
          variant="outlined"
          color="primary"
          startIcon={<CreditCard />}
          onClick={() => setOpenCancelMembershipPopup(true)}
        >
          Cancel User's Membership
        </QuickActionButton>
      )}
      <QuickActionButton
        variant="outlined"
        color="primary"
        startIcon={<DeleteIcon />}
        onClick={() => setOpenDeletePopup(true)}
      >
        Delete User's Profile
      </QuickActionButton>
    </Paper>
  );
};

export default AdminQuickActions;
