import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { NotificationsActive, Lock, Delete } from "@mui/icons-material";

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: theme.spacing(4),
  color: theme.palette.primary.main,
}));

const StyledButton = styled(Button)(() => ({
  width: "100px",
}));

interface AccountOptionsProps {
  setOpenNotificationPreferences: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeletePopup: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountOptions: React.FC<AccountOptionsProps> = ({
  setOpenNotificationPreferences,
  setOpenDeletePopup,
  setOpenChangePassword,
}) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Account Options
      </Typography>
      <List>
        <ListItem>
          <StyledListItemIcon>
            <Lock />
          </StyledListItemIcon>
          <ListItemText primary="Change Password" />
          <StyledButton
            variant="outlined"
            color="primary"
            onClick={() => setOpenChangePassword(true)}
          >
            Change
          </StyledButton>
        </ListItem>
        <ListItem>
          <StyledListItemIcon>
            <NotificationsActive />
          </StyledListItemIcon>
          <ListItemText primary="Notification Preferences" />
          <StyledButton
            variant="outlined"
            color="primary"
            onClick={() => setOpenNotificationPreferences(true)}
          >
            Manage
          </StyledButton>
        </ListItem>
        <ListItem>
          <StyledListItemIcon>
            <Delete />
          </StyledListItemIcon>
          <ListItemText primary="Delete Account" />
          <StyledButton
            variant="outlined"
            color="error"
            onClick={() => setOpenDeletePopup(true)}
          >
            Delete
          </StyledButton>
        </ListItem>
      </List>
    </Paper>
  );
};

export default AccountOptions;
