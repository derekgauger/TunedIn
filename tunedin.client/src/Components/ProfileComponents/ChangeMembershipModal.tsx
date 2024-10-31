import React, { useEffect, useState } from "react";
import { Modal, Box, Grid, Button } from "@mui/material";
import { Membership } from "../../Utils/types";
import MembershipCard from "../StoreComponents/MembershipCard/MembershipCard";
import { getMemberships } from "../../Functions/memberships";
import { enqueueSnackbar } from "notistack";
import LoadingIcon from "../GeneralComponents/LoadingIcon/LoadingIcon";
import { DARK } from "../../Utils/colors";
import GenericSectionText from "../GeneralComponents/GenericSectionText";
import CustomTypography from "../CustomUI/CustomTypography";

interface ChangeMembershipModalProps {
  open: boolean;
  onClose: () => void;
  currentMembership: Membership | undefined;
  onMembershipChange: (requestedMembership: string) => void;
  submitText: string;
}

const ChangeMembershipModal: React.FC<ChangeMembershipModalProps> = ({
  open,
  onClose,
  currentMembership,
  onMembershipChange,
  submitText,
}) => {
  const [selectedMembership, setSelectedMembership] =
    useState<Membership | null>(null);
  const [membershipOptions, setMembershipOptions] = useState<Membership[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchMemberships = async () => {
      try {
        const response = await getMemberships();
        if (response?.status === 200) {
          setMembershipOptions(response.data);
        } else {
          enqueueSnackbar(
            "Failed to get memberships. Please try again later.",
            { variant: "error" }
          );
        }
      } catch {
        enqueueSnackbar(
          "Failed to get memberships. Try reloading the page. If that doesn't work, contact us!",
          { variant: "error" }
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchMemberships();
  }, []);

  const handleMembershipSelect = (membership: Membership) => {
    setSelectedMembership(membership);
  };

  const handleConfirmChange = () => {
    if (selectedMembership) {
      onMembershipChange(selectedMembership.title);
      onClose();
    }
  };

  if (isLoading) {
    return <LoadingIcon />;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="change-membership-modal"
      aria-describedby="change-membership-options"
      sx={{
        border: "none",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "80%", md: "90%", lg: "80%" },
          maxHeight: "90vh",
          bgcolor: DARK ? "secondary.main" : "background.paper",
          boxShadow: 24,
          p: 4,
          overflow: "auto",
          border: "none",
        }}
      >
        <CustomTypography
          size={"xl"}
          color="white"
          bold
          style={{ fontVariant: "small-caps" }}
        >
          Change Membership
        </CustomTypography>
        <GenericSectionText
          text="Current Membership"
          type="Header"
          className="my-2"
        />
        <Box mb={4}>
          {!currentMembership ? (
            <GenericSectionText type="Description">
              You do not have a membership
            </GenericSectionText>
          ) : (
            <MembershipCard option={currentMembership} isCurrent isOnModal />
          )}
        </Box>
        <GenericSectionText
          text="Available Memberships"
          type="Header"
          className="mb-2"
        />
        <Grid container spacing={4}>
          {membershipOptions
            .filter(
              (membership) => membership.title !== currentMembership?.title
            )
            .map((membership, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <MembershipCard
                  option={membership}
                  isSelected={selectedMembership?.title === membership.title}
                  onClick={() => handleMembershipSelect(membership)}
                  isOnModal
                />
              </Grid>
            ))}
        </Grid>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button onClick={onClose} variant="outlined" color="primary">
            Cancel
          </Button>
          {selectedMembership && (
            <Button
              onClick={handleConfirmChange}
              variant="contained"
              color="primary"
            >
              {submitText}
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ChangeMembershipModal;
