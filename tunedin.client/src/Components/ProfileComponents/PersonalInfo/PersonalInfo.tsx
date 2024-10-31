import { Avatar, Box, Button, Paper } from "@mui/material";
import React from "react";
import { enqueueSnackbar } from "notistack";
import GenericSectionText from "../../GeneralComponents/GenericSectionText";
import { User } from "../../../Utils/types";
import { DARK } from "../../../Utils/colors";

interface PersonalInfoProps {
  userDetails: User | undefined;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ userDetails }) => {
  return (
    <Paper
      elevation={3}
      sx={{ p: 3, mb: 4, backgroundColor: DARK ? "secondary.light" : "white" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Avatar
          src={userDetails?.avatar}
          alt={`${userDetails?.firstName} ${userDetails?.lastName}`}
          sx={{ width: 150, height: 150, mb: 2 }}
        />
        <Button variant="outlined" component="label" sx={{ mb: 2 }}>
          Upload Picture
          <input
            type="none"
            hidden
            onClick={() =>
              enqueueSnackbar("These feature is currently not supported yet.", {
                variant: "error",
              })
            }
          />
        </Button>
      </Box>
      <GenericSectionText type="Header">
        {userDetails?.firstName} {userDetails?.lastName}
      </GenericSectionText>
      <GenericSectionText type="AccordionBulletDescription">
        Member since: {userDetails?.createdAt}
      </GenericSectionText>
      <GenericSectionText type="Description" className="break-all">
        Goal: {userDetails?.goal ? userDetails?.goal : "No goal set"}
      </GenericSectionText>
    </Paper>
  );
};

export default PersonalInfo;
