import React, { useState } from "react";
import { RedirectCardData } from "../../../Utils/types";
import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
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
  }

  return (
    <Card
      className="h-full transition-transform duration-300 hover:scale-105 cursor-pointer relative"
      sx={{
        bgcolor: "background.paper",
        overflow: "hidden", // Ensure the arrow doesn't overflow
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
      onClick={handleNavigation}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent
        className="flex flex-col items-center text-center h-full"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "padding-right 0.3s ease-in-out",
          pr: isHovered ? 6 : 2, // Adjust padding when hovered
        }}
      >
        <Box>
          <Box sx={{ color: "primary.main", fontSize: 40 }} className="text-primary-600 mb-4">
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
      
      {/* Full-height arrow - only shown when hovered */}
      {isHovered && (
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 48, // Adjust width as needed
            backgroundColor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 0.3s ease-in-out",
            opacity: 1,
          }}
        >
          <ArrowForward sx={{ color: "white" }} />
        </Box>
      )}
    </Card>
  );
};

export default RedirectCard;