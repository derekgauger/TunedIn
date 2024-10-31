import { Box, Button, Paper } from "@mui/material";
import React from "react";
import MembershipCard from "../../StoreComponents/MembershipCard/MembershipCard";
import GenericSectionText from "../../GeneralComponents/GenericSectionText";
import { User } from "../../../Utils/types";
import { DARK } from "../../../Utils/colors";

interface CurrentMembershipSectionProps {
  userDetails: User | undefined;
  openChangeMembershipModal: React.Dispatch<React.SetStateAction<boolean>>;
  openCancelMembershipPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const CurrentMembershipSection: React.FC<CurrentMembershipSectionProps> = ({
  userDetails,
  openChangeMembershipModal,
  openCancelMembershipPopup,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{ p: 3, mb: 4, backgroundColor: DARK ? "secondary.light" : "white" }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Current Membership */}
        <Box sx={{ mb: 3 }}>
          <GenericSectionText type="Header" className="mb-2">
            Current Membership
          </GenericSectionText>
          {userDetails?.membershipData ? (
            <MembershipCard option={userDetails?.membershipData} isCurrent />
          ) : (
            <GenericSectionText type="Description">
              You do not have a membership
            </GenericSectionText>
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              openChangeMembershipModal(true);
            }}
          >
            {userDetails?.membershipData
              ? "Request Membership Change"
              : "Get Membership"}
          </Button>
          {userDetails?.membershipData && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => openCancelMembershipPopup(true)}
            >
              Request Membership Cancellation
            </Button>
          )}
        </Box>

        {/* Disclaimer */}
        <Box>
          <GenericSectionText type="Header">Disclaimer</GenericSectionText>
          <GenericSectionText type="Description">
            Please note that cancelling your membership may result in the loss
            of your current benefits and progress. Membership changes will take
            effect at the start of your next billing cycle. For any questions
            regarding your membership, please contact our support team.
          </GenericSectionText>
        </Box>
      </Box>
    </Paper>
  );
};

export default CurrentMembershipSection;
