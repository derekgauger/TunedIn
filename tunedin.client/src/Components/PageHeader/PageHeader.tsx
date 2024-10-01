import React from "react";
import { Container, Divider, Typography } from "@mui/material";

interface PageHeaderProps {
  title: string;
  subText?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subText }) => {
  return (
    <Container sx={{ mb: 2 }}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
        sx={{ fontWeight: "bold", color: "primary.main" }}
      >
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {subText && (
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          {subText}
        </Typography>
      )}
    </Container>
  );
};

export default PageHeader;
