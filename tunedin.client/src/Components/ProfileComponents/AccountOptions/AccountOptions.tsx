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
import GenericSectionText from "../../GeneralComponents/GenericSectionText";

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
      <GenericSectionText text="Account Options" type="Header" />
      <List>
        <ListItem>
          <StyledListItemIcon>
            <Lock />
          </StyledListItemIcon>
          <ListItemText
            primary={
              <GenericSectionText type="Description" colorOverride="black">
                Change Password
              </GenericSectionText>
            }
          />
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
          <ListItemText
            primary={
              <GenericSectionText type="Description" colorOverride="black">
                Notification Preferences
              </GenericSectionText>
            }
          />
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
          <ListItemText
            primary={
              <GenericSectionText type="Description" colorOverride="black">
                Delete Account
              </GenericSectionText>
            }
          />
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
