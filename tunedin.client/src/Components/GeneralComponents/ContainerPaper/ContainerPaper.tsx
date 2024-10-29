import React from "react";
import { Box, Container, Paper } from "@mui/material";

interface ContainerPaperProps {
  children: React.ReactNode;
}

const ContainerPaper: React.FC<ContainerPaperProps> = ({ children }) => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: { xs: 9, sm: 12, md: 12 },
        px: { xs: 0, sm: 3 }, // Remove horizontal padding on xs screens
      }}
    >
      <Box
        sx={{
          my: { xs: 2, sm: 4 },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 },
            backgroundColor: "#fafafa",
          }}
        >
          {children}
        </Paper>
      </Box>
    </Container>
  );
};

export default ContainerPaper;
