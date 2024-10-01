import { useState } from "react";
import { Button, Typography, Box, Paper } from "@mui/material";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Hooks/useUser";
import BackgroundImage from "../BackgroundImage/BackgroundImage";
import { parsePhoneNumber } from "../../Utils/functions";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [triedSubmit, setTriedSubmit] = useState(false);
  const { login, register } = useUser();

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isLogin) {
        const response = await login(values.loginIdentifier, values.password);
        if (response.error) {
          // Handle login error
          console.error(response.error);
          // Optionally, display an error message to the user
          // setError(response.error);
        } else {
          navigate("/");
        }
      } else {
        const response = register(
          values.firstName,
          values.lastName,
          values.username,
          values.email,
          values.password,
          parsePhoneNumber(values.phoneNumber)
        );
        if (response.error) {
          // Handle registration error
          console.error(response.error);
          // Optionally, display an error message to the user
          // setError(response.error);
        } else {
          toggleForm();
        }
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("An unexpected error occurred:", error);
      // Optionally, display an error message to the user
      // setError("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = async (values: any, { setSubmitting }: any) => {
    console.log("Forgot password submitted", values);
    setSubmitting(false);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setTriedSubmit(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <BackgroundImage
        image={
          "https://web-back.perfectgym.com/sites/default/files/styles/460x/public/gym%20peak%20time%20%282%29.jpg?itok=jhaMm43E"
        }
      />
      <Paper
        elevation={3}
        sx={{
          width: 1000,
          height: 600,
          display: "flex",
          overflow: "hidden",
          position: "relative",
        }}
      >
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
          <Typography variant="h4" component="h2" gutterBottom align="center">
            {isLogin ? "Welcome Back!" : "Welcome!"}
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 2 }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Typography>
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
        <LoginForm
          handleSubmit={handleSubmit}
          triedSubmit={triedSubmit}
          setTriedSubmit={setTriedSubmit}
          handleForgotPassword={handleForgotPassword}
        />
        <RegisterForm
          handleSubmit={handleSubmit}
          triedSubmit={triedSubmit}
          setTriedSubmit={setTriedSubmit}
        />
      </Paper>
    </Box>
  );
};

export default Login;
