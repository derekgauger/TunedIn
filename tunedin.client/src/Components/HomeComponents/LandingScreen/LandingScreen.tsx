import { Box, Button, Container, Stack, Divider } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { ArrowForward } from "@mui/icons-material";
import CustomTypography from "../../CustomUI/CustomTypography";
import SocialLinks from "../SocialLinks";

const LandingScreen: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: {
          xs: "100vh", // Adjusted for smaller mobile header
          sm: "100vh", // Adjusted for standard header height
          md: "100vh",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={2} alignItems="center">
          <Box textAlign="center" mx="auto">
            <CustomTypography
              size="5xl"
              bold
              color="white"
              style={{
                width: "80%",
                textAlign: "center",
                margin: "auto",
                lineHeight: 1.2,
                marginBottom: 3,
                textShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
              fontSizeOverrides={{
                xs: "3xl",
                sm: "3xl",
                md: "4xl",
                lg: "5xl",
                xl: "5xl",
                "2xl": "6xl",
              }}
            >
              Achieve Your Fitness Goals With Tuned In
            </CustomTypography>
            <Divider
              sx={{
                backgroundColor: "primary.main",
                height: 4,
                my: 4,
                maxWidth: "80%",
                marginX: "auto",
              }}
            />

            <CustomTypography
              size="xl"
              color="white"
              style={{
                opacity: 0.9,
                marginBottom: 6,
                maxWidth: "80%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              fontSizeOverrides={{
                xs: "md",
                sm: "md",
                md: "lg",
                lg: "xl",
                xl: "xl",
                "2xl": "2xl",
              }}
            >
              Join our state-of-the-art facility and get personalized training
              from expert coaches.
            </CustomTypography>

            {/* Social Media Section */}
            <SocialLinks />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              mt={2}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate("/services")}
                endIcon={<ArrowForward />}
                sx={{
                  px: 4,
                  py: 2,
                  fontWeight: "bold",
                }}
              >
                Start Your Journey
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  color: "white",
                  borderColor: "white",
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                  fontWeight: "bold",
                }}
                onClick={() => navigate("/about")}
              >
                Learn More
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default LandingScreen;
