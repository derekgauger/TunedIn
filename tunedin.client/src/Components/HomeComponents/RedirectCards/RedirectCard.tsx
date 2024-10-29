import React, { useState } from "react";
import { RedirectCardData } from "../../../Utils/types";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { scrollToTop } from "../../../Utils/functions";

interface RedirectCardProps {
  section: RedirectCardData;
}

const RedirectCard: React.FC<RedirectCardProps> = ({ section }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleNavigation = () => {
    navigate(section.link);
    scrollToTop();
  };

  return (
    <Card
      className="h-full transition-transform duration-300 hover:scale-105 cursor-pointer relative"
      sx={{
        bgcolor: "background.paper",
        overflow: "hidden",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
      onClick={handleNavigation}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image Layer */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("${section.backgroundImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "white",
            opacity: 0.65,
          },
        }}
      />

      <CardContent
        className="flex flex-col items-center text-center h-full relative"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          transition: "padding-right 0.3s ease-in-out",
          pr: isHovered ? 6 : 2,
          height: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box className="flex flex-col items-center flex-grow">
          <Box
            sx={{ color: "primary.main", fontSize: 40 }}
            className="text-primary-600 mb-4"
          >
            <section.icon style={{ fontSize: 40 }} />
          </Box>
          <Typography variant="h5" component="h3" className="mb-2">
            {section.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mb-4">
            {section.description}
          </Typography>
        </Box>
      </CardContent>

      {isHovered && (
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 48,
            backgroundColor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 0.3s ease-in-out",
            opacity: 1,
            zIndex: 2,
          }}
        >
          <ArrowForward sx={{ color: "white" }} />
        </Box>
      )}
    </Card>
  );
};

export default RedirectCard;
