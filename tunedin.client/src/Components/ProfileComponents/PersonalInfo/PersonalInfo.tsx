import { Avatar, Box, Button, Paper } from "@mui/material";
import React from "react";
import { useUser } from "../../../Hooks/useUser";
import { enqueueSnackbar } from "notistack";
import GenericSectionText from "../../GeneralComponents/GenericSectionText";

const PersonalInfo: React.FC = () => {
  const { user } = useUser();

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Avatar
          src={user?.avatar}
          alt={`${user?.firstName} ${user?.lastName}`}
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
        {user?.firstName} {user?.lastName}
      </GenericSectionText>
      <GenericSectionText type="AccordionBulletDescription">
        Member since: {user?.createdAt}
      </GenericSectionText>
      <GenericSectionText type="Description" className="break-all">
        Goal: {user?.goal ? user?.goal : "No goal set"}
      </GenericSectionText>
    </Paper>
  );
};

export default PersonalInfo;
