import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import ContainerPaper from "../GeneralComponents/ContainerPaper/ContainerPaper";
import { sendGetAllUsers } from "../../Functions/users";
import LoadingIcon from "../GeneralComponents/LoadingIcon/LoadingIcon";
import PageHeader from "../GeneralComponents/PageHeader/PageHeader";
import { Log, User } from "../../Utils/types";
import ProfilesTable from "./ProfilesTable";
import GenericSectionText from "../GeneralComponents/GenericSectionText";
import { handleNavigation } from "../../Utils/functions";
import SendMessageModal from "./SendMessageModal";
import { deleteLog, getLogs } from "../../Functions/logs";
import LogsTable from "./LogsTable";
import { enqueueSnackbar } from "notistack";

const ManageProfiles: React.FC = () => {
  // State
  const [isLoading, setIsLoading] = useState(false);
  const [profiles, setProfiles] = useState<User[]>([]);
  const [selectedUserAnchorEl, setSelectedUserAnchorEl] =
    useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState(false);

  const [logs, setLogs] = useState<Log[]>([]);
  const [selectedLog, setSelectedLog] = useState<Log | undefined>(undefined);
  const [selectedLogAnchorEl, setSelectedLogAnchorEl] =
    useState<null | HTMLElement>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      setIsLoading(true);
      try {
        const response = await sendGetAllUsers();
        if (response?.data) {
          setProfiles(response.data);
        } else {
          setProfiles([]);
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const response = await getLogs();
      if (response?.data) {
        setLogs(response.data);
      } else {
        setLogs([]);
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closeMenu = () => {
    setIsSendMessageModalOpen(false);
    setSelectedUserAnchorEl(null);
    setSelectedUser(undefined);
  };

  const handleDeleteLog = async () => {
    if (selectedLog?.id !== undefined) {
      await deleteLog(selectedLog.id);
    }
    await fetchLogs();
    setSelectedLogAnchorEl(null);
  };

  const handleOnSendEmail = () => {
    closeMenu();
    setTimeout(() => {
      fetchLogs();
    }, 2000); // 2 seconds delay to allow time for email to send
  };

  if (isLoading) {
    return <LoadingIcon />;
  }

  return (
    <ContainerPaper>
      <PageHeader title="Manage Profiles" />
      <SendMessageModal
        isOpen={isSendMessageModalOpen}
        onClose={closeMenu}
        selectedUser={selectedUser}
        onSendEmail={handleOnSendEmail}
      />
      <GenericSectionText text="Admins" type="Header" className="mb-4" />
      <ProfilesTable
        profiles={profiles.filter((profile) => profile.isAdmin)}
        setFilterAnchorEl={setSelectedUserAnchorEl}
        setSelectedUser={setSelectedUser}
      />
      <GenericSectionText text="Users" type="Header" className="mb-4 mt-12" />
      <ProfilesTable
        profiles={profiles.filter((profile) => !profile.isAdmin)}
        setFilterAnchorEl={setSelectedUserAnchorEl}
        setSelectedUser={setSelectedUser}
      />
      <GenericSectionText text="Logs" type="Header" className="mb-4 mt-12" />
      <LogsTable
        logs={logs}
        setSelectedLog={setSelectedLog}
        setActionAnchorEl={setSelectedLogAnchorEl}
      />
      {/* User Actions */}
      <Menu
        anchorEl={selectedUserAnchorEl}
        open={Boolean(selectedUserAnchorEl)}
        onClose={closeMenu}
        disableScrollLock
        PaperProps={{
          sx: {
            border: "1px solid gray",
            bgcolor: "secondary.light",
            color: "white",
            "& .MuiMenuItem-root:hover": {
              bgcolor: "secondary.dark",
            },
          },
        }}
      >
        <MenuItem
          onClick={() =>
            handleNavigation(`/manage-profiles/${selectedUser?.username}`)
          }
        >
          Visit Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSelectedUserAnchorEl(null);
            setIsSendMessageModalOpen(true);
          }}
        >
          Send Message
        </MenuItem>
      </Menu>

      {/* Log Actions */}
      <Menu
        anchorEl={selectedLogAnchorEl}
        open={Boolean(selectedLogAnchorEl)}
        onClose={() => setSelectedLogAnchorEl(null)}
        disableScrollLock
        PaperProps={{
          sx: {
            border: "1px solid gray",
            bgcolor: "secondary.light",
            color: "white",
            "& .MuiMenuItem-root:hover": {
              bgcolor: "secondary.dark",
            },
          },
        }}
      >
        <MenuItem onClick={handleDeleteLog}>Delete Log</MenuItem>
      </Menu>
    </ContainerPaper>
  );
};

export default ManageProfiles;
