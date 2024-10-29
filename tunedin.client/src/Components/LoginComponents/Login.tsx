import { useState } from "react";
import { Box, Paper } from "@mui/material";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Hooks/useUser";
import BackgroundImage from "../GeneralComponents/BackgroundImage/BackgroundImage";
import { parsePhoneNumber } from "../../Utils/functions";
import useMediaQuery from "@mui/material/useMediaQuery";
import SlidingAlternativeOptionBox from "./SlidingAlternativeOptionBox";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [triedSubmit, setTriedSubmit] = useState(false);
  const { login, register } = useUser();

  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:1050px)");

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    if (isLogin) {
      const successfulLogin = await login(
        values.loginIdentifier,
        values.password
      );
      if (successfulLogin) {
        navigate("/");
      }
    } else {
      const successfulRegister = await register(
        values.firstName,
        values.lastName,
        values.username,
        values.email,
        values.password,
        parsePhoneNumber(values.phoneNumber)
      );
      if (successfulRegister) {
        toggleForm();
      }
    }
    setSubmitting(false);
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
        {!isMobile ? (
          <div>
            <SlidingAlternativeOptionBox
              isLogin={isLogin}
              toggleForm={toggleForm}
            />
            <LoginForm
              handleSubmit={handleSubmit}
              triedSubmit={triedSubmit}
              setTriedSubmit={setTriedSubmit}
              handleForgotPassword={handleForgotPassword}
              isMobile={isMobile}
              toggleForm={toggleForm}
            />
            <RegisterForm
              handleSubmit={handleSubmit}
              triedSubmit={triedSubmit}
              setTriedSubmit={setTriedSubmit}
              isMobile={isMobile}
              toggleForm={toggleForm}
            />
          </div>
        ) : (
          <div>
            {isLogin ? (
              <LoginForm
                handleSubmit={handleSubmit}
                triedSubmit={triedSubmit}
                setTriedSubmit={setTriedSubmit}
                handleForgotPassword={handleForgotPassword}
                isMobile={isMobile}
                toggleForm={toggleForm}
              />
            ) : (
              <RegisterForm
                handleSubmit={handleSubmit}
                triedSubmit={triedSubmit}
                setTriedSubmit={setTriedSubmit}
                isMobile={isMobile}
                toggleForm={toggleForm}
              />
            )}
          </div>
        )}
      </Paper>
    </Box>
  );
};

export default Login;
