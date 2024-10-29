import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomTypography from "../CustomUI/CustomTypography";
import { useNavigate } from "react-router";

interface SlidingAlternativeOptionBoxProps {
  isLogin: boolean;
  toggleForm: () => void;
}

const SlidingAlternativeOptionBox: React.FC<
  SlidingAlternativeOptionBoxProps
> = ({ isLogin, toggleForm }) => {
  const navigate = useNavigate();
  
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: isLogin ? "50%" : "0%",
        width: "50%",
        height: "100%",
        transition: "left 0.2s ease-in-out",
        bgcolor: "primary.main",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        zIndex: 2,
      }}
    >
      <CustomTypography size={"3xl"} fontSizeOverrides={{ xl: '3xl', '2xl': '3xl'}}>
        {isLogin ? "Welcome Back!" : "Welcome!"}
      </CustomTypography>
      <CustomTypography size={"lg"} style={{ padding: 10 }} fontSizeOverrides={{ xl: 'lg', '2xl': 'lg'}}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
      </CustomTypography>
      <Button variant="outlined" color="inherit" onClick={toggleForm}>
        {isLogin ? "Sign Up" : "Sign In"}
      </Button>
      <IconButton
        color="inherit"
        onClick={() => navigate("/")}
        sx={{ position: "absolute", top: 16, left: 16 }}
      >
        <ArrowBackIcon />
        <Typography variant="body2" sx={{ ml: 1 }}>
          Back to site
        </Typography>
      </IconButton>
    </Box>
  );
};

export default SlidingAlternativeOptionBox;
