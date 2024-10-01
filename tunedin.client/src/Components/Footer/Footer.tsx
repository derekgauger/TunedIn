import React from 'react';
import { Box, Container, Typography, Grid, IconButton, useTheme } from '@mui/material';
import { Facebook, Instagram, LinkedIn, YouTube, Reddit, Twitter } from '@mui/icons-material';

const Footer: React.FC = () => {
  const theme = useTheme();

  const socialLinks = [
    { icon: <Facebook />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <Twitter />, url: 'https://x.com', label: 'X (formerly Twitter)' },
    { icon: <Instagram />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <LinkedIn />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <YouTube />, url: 'https://youtube.com', label: 'YouTube' },
    { icon: <Reddit />, url: 'https://reddit.com', label: 'Reddit' },
  ];

  return (
    <Box component="footer" sx={{ bgcolor: 'black', color: 'white', py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">Email: contact@tunedin.com</Typography>
            <Typography variant="body2">Phone: (123) 456-7890</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {socialLinks.map((link, index) => (
                <IconButton
                  key={index}
                  aria-label={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'white', '&:hover': { color: theme.palette.primary.main } }}
                >
                  {link.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              TunedIn is your go-to platform for the latest in music and entertainment.
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} TunedIn. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;