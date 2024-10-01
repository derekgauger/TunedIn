import React from 'react';
import { Box, Container, Paper } from '@mui/material';

interface ContainerPaperProps {
  children: React.ReactNode;
}

const ContainerPaper: React.FC<ContainerPaperProps> = ({ children }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          {children}
        </Paper>
      </Box>
    </Container>
  );
};

export default ContainerPaper;