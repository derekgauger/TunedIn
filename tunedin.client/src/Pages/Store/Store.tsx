/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import ContainerPaper from "../../Components/GeneralComponents/ContainerPaper/ContainerPaper";
import PageHeader from "../../Components/GeneralComponents/PageHeader/PageHeader";
import { Membership } from "../../Utils/types";
import { getMemberships } from "../../Functions/memberships";
import MembershipCard from "../../Components/StoreComponents/MembershipCard/MembershipCard";
import LoadingIcon from "../../Components/GeneralComponents/LoadingIcon/LoadingIcon";
import { enqueueSnackbar } from "notistack";

const Store: React.FC = () => {
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

  if (isLoading) {
    return <LoadingIcon />;
  }

  return (
    <ContainerPaper>
      <PageHeader
        title="Membership Plans"
        subText="Choose the membership that bests fits your needs. Can't decide? Contact us for a personalized recommendation."
      />
      <Grid container spacing={4}>
        {membershipOptions.map((option, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={4}
          >
            <MembershipCard option={option} />
          </Grid>
        ))}
      </Grid>
    </ContainerPaper>
  );
};

export default Store;
