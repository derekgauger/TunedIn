import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface SectionProps {
  title: string;
  content: React.ReactNode;
  bgColor: string;
  buttonText?: string;
  buttonLink?: string;
  transparent?: boolean;
}

const Section: React.FC<SectionProps> = ({
  title,
  content,
  bgColor,
  buttonText,
  buttonLink,
  transparent
}) => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    scrollToTop();
  };

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: transparent ? "transparent" : bgColor, textAlign: "center", color: transparent ? 'white' : 'black'}}>
      <Container maxWidth="md">
        <Box sx={{ maxWidth: "100%", mx: "auto" }}>
          <Typography variant="h3" component="h2" gutterBottom align="center" textAlign="center">
            {title}
          </Typography>
          <Box sx={{ my: 4 }}>
            {content}
          </Box>
          {buttonText && buttonLink && (
            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNavigation(buttonLink)}
              >
                {buttonText}
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Section;