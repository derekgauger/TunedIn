import React from "react";
import { Box, Container, Paper } from "@mui/material";
import { DARK } from "../../../Utils/colors";

interface ContainerPaperProps {
  children: React.ReactNode;
  sx?: object;
}

const ContainerPaper: React.FC<ContainerPaperProps> = ({ children, sx }) => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: { xs: 9, sm: 12, md: 12 },
        px: { xs: 0, sm: 3 },
        ...sx,
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
            backgroundColor: DARK ? "secondary.main" : "#fafafa",
            minHeight: "100vh",
          }}
        >
          {children}
        </Paper>
      </Box>
    </Container>
  );
};

export default ContainerPaper;
