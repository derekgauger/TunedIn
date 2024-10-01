import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { useUser } from "../../../Hooks/useUser";
import { enqueueSnackbar } from "notistack";

interface PersonalInfoProps {
}

const PersonalInfo: React.FC<PersonalInfoProps> = () => {
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
          <input type="none" hidden onClick={() => enqueueSnackbar("These feature is currently not supported yet.", { variant: 'error' })}/>
        </Button>
      </Box>
      <Typography variant="h5" gutterBottom>
        {user?.firstName} {user?.lastName}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Member since: {user?.createdAt}
      </Typography>
      <Typography variant="body1" paragraph>
        Goal: {user?.goal ? user?.goal : "No goal set"}
      </Typography>
    </Paper>
  );
};

export default PersonalInfo;
