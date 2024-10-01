import { Avatar, Paper, Typography, Box } from "@mui/material";
import React from "react";
import { AboutCompanyInfoData } from "../../Utils/types";

const CompanyInfo: React.FC = () => {
  const companyInfo: AboutCompanyInfoData = {
    logo: "/logo.png",
    name: "Our Company",
    description:
      "We are a passionate team dedicated to creating innovative solutions for our clients.",
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "80%",
        }}
      >
        <Avatar
          sx={{ width: 100, height: 100, mb: 2, borderRadius: 0 }}
          alt="Company Logo"
          src={companyInfo.logo}
        />
        <Typography variant="h5" component="h2" gutterBottom align="center">
          {companyInfo.name}
        </Typography>
        <Typography variant="body1" align="center">
          {companyInfo.description}
        </Typography>
      </Box>
    </Paper>
  );
};

export default CompanyInfo;