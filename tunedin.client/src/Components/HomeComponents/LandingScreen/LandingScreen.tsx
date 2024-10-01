import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { ArrowForward } from "@mui/icons-material";
import { scrollToTop } from "../../../Utils/functions";

const LandingScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    scrollToTop();
  };

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={4} alignItems="center">
          <Typography
            variant="h2"
            component="h1"
            align="center"
            color="white"
            fontWeight="bold"
          >
            Welcome to our fitness training center.
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="white"
            sx={{ maxWidth: "sm", mx: "auto" }}
          >
            Get the right fitness training for you. Sign in or join our
            membership.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
            <Button
              type="submit"
              variant="contained"
              onClick={() => handleNavigation("/services")}
              sx={{
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
                px: 4,
              }}
              endIcon={<ArrowForward />}
            >
              Get Started
            </Button>{" "}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default LandingScreen;
