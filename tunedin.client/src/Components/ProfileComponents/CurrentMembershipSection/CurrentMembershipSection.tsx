import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import MembershipCard from "../../StoreComponents/MembershipCard/MembershipCard";
import { useUser } from "../../../Hooks/useUser";

interface CurrentMembershipSectionProps {}

const CurrentMembershipSection: React.FC<
  CurrentMembershipSectionProps
> = () => {
  const { user } = useUser();

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
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
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
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
            Please note that cancelling your membership may result in the loss
            of your current benefits and progress. Membership changes will take
            effect at the start of your next billing cycle. For any questions
            regarding your membership, please contact our support team.
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CurrentMembershipSection;
