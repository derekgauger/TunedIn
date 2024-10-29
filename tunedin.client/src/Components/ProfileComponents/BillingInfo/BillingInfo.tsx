import { Paper, Typography } from "@mui/material";
import React from "react";

const BillingInfo: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Billing Information
      </Typography>
      <Typography variant="body2">Last Billing Date: May 1, 2023</Typography>
      <Typography variant="body2">Next Billing Date: June 1, 2023</Typography>
      <Typography variant="body2">Billing Amount: $19.99</Typography>
    </Paper>
  );
};

export default BillingInfo;
