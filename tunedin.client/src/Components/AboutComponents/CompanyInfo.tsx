import { Avatar, Paper, Box } from "@mui/material";
import React from "react";
import { AboutCompanyInfoData } from "../../Utils/types";
import GenericSectionText from "../GeneralComponents/GenericSectionText";
import { DARK } from "../../Utils/colors";

const CompanyInfo: React.FC = () => {
  const companyInfo: AboutCompanyInfoData = {
    logo: "/logo.png",
    name: "The Company",
    description:
      "Tuned In Athlete Development is a no-nonsense approach to fitness and 100% centered around individuals and their goals.",
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: DARK ? "secondary.light" : "white",
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
        <GenericSectionText
          text={companyInfo.name}
          type={"Header"}
          alignment="center"
          className="mb-2"
        />
        <GenericSectionText
          text={companyInfo.description}
          alignment="center"
          type="Description"
        />
      </Box>
    </Paper>
  );
};

export default CompanyInfo;
