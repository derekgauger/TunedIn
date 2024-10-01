import React from "react";
import { Grid } from "@mui/material";
import ContainerPaper from "../../Components/GeneralComponents/ContainerPaper/ContainerPaper";
import PageHeader from "../../Components/GeneralComponents/PageHeader/PageHeader";
import EmailForm from "../../Components/ContactPageSections/EmailForm";
import ContactInfo from "../../Components/ContactPageSections/ContactInfo";

const Contact: React.FC = () => {
  return (
    <ContainerPaper>
      <PageHeader title="Contact Us" />

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <EmailForm />
        </Grid>
        <Grid item xs={12} md={4}>
          <ContactInfo />
        </Grid>
      </Grid>
    </ContainerPaper>
  );
};

export default Contact;
