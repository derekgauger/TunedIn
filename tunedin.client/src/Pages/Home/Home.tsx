import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Phone,
  Email,
  LocationOn,
} from "@mui/icons-material";
import LandingScreen from "../../Components/LandingScreen/LandingScreen";
import Section from "../../Components/Section/Section";

const Home: React.FC = () => {
  return (
    <Box sx={{ overflow: "auto" }}>
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <LandingScreen />
      </Box>

      <Section
        title="About Us"
        content={
          <>
            <Typography variant="body1" paragraph>
              At TunedIn, we offer a comprehensive fitness training program
              designed to help you achieve your health and wellness goals. Our
              expert trainers provide personalized workout plans, nutritional
              guidance, and ongoing support to ensure you stay motivated and on
              track. Whether you're a beginner or an experienced athlete, our
              program is tailored to meet your individual needs and help you
              reach your full potential.
            </Typography>
          </>
        }
        bgColor="#f5f5f5"
        buttonText="Learn More"
        buttonLink="/about"
      />

      <Section
        title="Showcase"
        content={
          <>
            <Typography variant="body1" paragraph>
              Explore our gallery of fitness photos and videos to see our
              community in action. From workout sessions to special events, get
              inspired by the dedication and energy of our members.
            </Typography>
            <Grid container spacing={2}>
              {[...Array(4)].map((_, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Box
                    component="img"
                    src={`https://picsum.photos/seed/${index}/300/200`}
                    alt={`Event ${index + 1}`}
                    sx={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "4px",
                      boxShadow: 2,
                      transition:
                        "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: 6,
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        }
        bgColor="#ffffff"
        buttonText="View Gallery"
        buttonLink="/gallery"
      />

      <Section
        title="Try it yourself"
        content={
          <>
            <Typography variant="body1" paragraph>
              Show your support and style with our exclusive TunedIn
              merchandise. From apparel to accessories, find the perfect items
              to express your love for music and our community.
            </Typography>
          </>
        }
        bgColor="#f5f5f5"
        buttonText="Shop Now"
        buttonLink="/shop"
      />

      <Section
        title="Contact"
        content={
          <>
            <Typography variant="body1" paragraph>
              Have questions or want to get in touch? We'd love to hear from
              you! Reach out to our team for inquiries, support, or
              collaboration opportunities.
            </Typography>
            <Grid
              container
              spacing={2}
              sx={{ mt: 2 }}
              justifyContent={"center"}
            >
              <Grid item>
                <Facebook
                  sx={{ fontSize: 40, cursor: "pointer" }}
                  onClick={() =>
                    window.open("https://www.facebook.com", "_blank")
                  }
                />
              </Grid>
              <Grid item>
                <Twitter
                  sx={{ fontSize: 40, cursor: "pointer" }}
                  onClick={() =>
                    window.open("https://www.twitter.com", "_blank")
                  }
                />
              </Grid>
              <Grid item>
                <Instagram
                  sx={{ fontSize: 40, cursor: "pointer" }}
                  onClick={() =>
                    window.open("https://www.instagram.com", "_blank")
                  }
                />
              </Grid>
              <Grid item>
                <LinkedIn
                  sx={{ fontSize: 40, cursor: "pointer" }}
                  onClick={() =>
                    window.open("https://www.linkedin.com", "_blank")
                  }
                />
              </Grid>
              <Grid item>
                <Phone
                  sx={{ fontSize: 40, cursor: "pointer" }}
                  onClick={() => window.open("tel:+1234567890")}
                />
              </Grid>
              <Grid item>
                <Email
                  sx={{ fontSize: 40, cursor: "pointer" }}
                  onClick={() => window.open("mailto:info@tunedin.com")}
                />
              </Grid>
              <Grid item>
                <LocationOn
                  sx={{ fontSize: 40, cursor: "pointer" }}
                  onClick={() =>
                    window.open(
                      "https://www.google.com/maps/place/Your+Location",
                      "_blank"
                    )
                  }
                />
              </Grid>
            </Grid>
          </>
        }
        bgColor="#ffffff"
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </Box>
  );
};

export default Home;
