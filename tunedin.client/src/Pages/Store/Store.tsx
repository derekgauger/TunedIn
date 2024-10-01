import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import ContainerPaper from "../../Components/ContainerPaper/ContainerPaper";
import PageHeader from "../../Components/PageHeader/PageHeader";
import { Membership } from "../../Utils/types";
import MembershipCard from "../../Components/MembershipCard/MembershipCard";
import { getMemberships } from "../../Functions/memberships";


const Store: React.FC = () => {
  const [membershipOptions, setMembershipOptions] = useState< Membership[]>([]);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await getMemberships();
        setMembershipOptions(response.data);
      } catch (error) {
        console.error("Failed to get memberships:", error);
      }
    };
    fetchMemberships();
  }, []);

  return (
    <ContainerPaper>
      <PageHeader
        title="Membership Plans"
        subText="Choose the membership that bests fits your needs."
      />
      <Grid container spacing={4}>
        {membershipOptions.map((option, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <MembershipCard option={option} />
          </Grid>
        ))}
      </Grid>
    </ContainerPaper>
  );
};

export default Store;
