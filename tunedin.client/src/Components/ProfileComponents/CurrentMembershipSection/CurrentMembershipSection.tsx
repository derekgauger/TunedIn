import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import MembershipCard from "../../StoreComponents/MembershipCard/MembershipCard";
import { useUser } from "../../../Hooks/useUser";
import { useNavigate } from "react-router";
import { scrollToTop } from "../../../Utils/functions";
import GenericSectionText from "../../GeneralComponents/GenericSectionText";

const CurrentMembershipSection: React.FC = () => {
  const { user } = useUser();

  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    scrollToTop();
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Current Membership */}
        <Box sx={{ mb: 3 }}>
          <GenericSectionText type="Header">
            Current Membership
          </GenericSectionText>
          {user?.membershipData ? (
            <MembershipCard option={user?.membershipData} isCurrent />
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
            onClick={() => handleNavigation("/services")}
          >
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
