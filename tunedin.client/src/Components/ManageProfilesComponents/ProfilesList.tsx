import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import ContainerPaper from "../GeneralComponents/ContainerPaper/ContainerPaper";
import { sendGetAllUsers } from "../../Functions/users";
import LoadingIcon from "../GeneralComponents/LoadingIcon/LoadingIcon";
import PageHeader from "../GeneralComponents/PageHeader/PageHeader";
import { User } from "../../Utils/types";
import ProfilesTable from "./ProfilesTable";
import GenericSectionText from "../GeneralComponents/GenericSectionText";
import { handleNavigation } from "../../Utils/functions";

const ProfilesList: React.FC = () => {
  // State
  const [isLoading, setIsLoading] = useState(false);
  const [profiles, setProfiles] = useState<User[]>([]);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Effects
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

  const closeMenu = () => {
    setFilterAnchorEl(null);
    setSelectedUser(null);
  };

  if (isLoading) {
    return <LoadingIcon />;
  }

  return (
    <ContainerPaper>
      <PageHeader title="Manage Profiles" />

      <GenericSectionText text="Admins" type="Header" className="mb-4" />

      <ProfilesTable
        profiles={profiles.filter((profile) => profile.isAdmin)}
        setFilterAnchorEl={setFilterAnchorEl}
        setSelectedUser={setSelectedUser}
      />

      <GenericSectionText text="Users" type="Header" className="mb-4 mt-12" />

      <ProfilesTable
        profiles={profiles.filter((profile) => !profile.isAdmin)}
        setFilterAnchorEl={setFilterAnchorEl}
        setSelectedUser={setSelectedUser}
      />

      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={closeMenu}
        disableScrollLock
        PaperProps={{
          sx: {
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
        <MenuItem onClick={() => setFilterAnchorEl(null)}>
          Send Message
        </MenuItem>
      </Menu>
    </ContainerPaper>
  );
};

export default ProfilesList;
