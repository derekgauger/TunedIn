import React, { useState, useEffect, ReactNode } from "react";
import { User } from "../Utils/types";
import userContext from "../Contexts/UserContext";
import {
  sendLoginRequest,
  sendRegisterRequest,
  sendUserInfoRequest,
} from "../Functions/users";
import { getMembership } from "../Functions/memberships";
import { enqueueSnackbar } from "notistack";
import { checkTokenExpired, handleNavigation } from "../Utils/functions";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (checkTokenExpired()) {
      logout(true);
    } else {
      queryUser();
    }
  }, []);

  const login = async (loginIdentifier: string, password: string) => {
    const loginResponse = await sendLoginRequest(loginIdentifier, password);

    if (loginResponse?.status !== 200) {
      enqueueSnackbar(loginResponse?.data.message, {
        variant: "error",
      });
      return false;
    }
    const userInfoRequest = await sendUserInfoRequest();
    if (userInfoRequest?.status !== 200) {
      enqueueSnackbar(userInfoRequest?.data.message, {
        variant: "error",
      });
      return false;
    }
    const userData = userInfoRequest?.data;
    setUser(userData);
    enqueueSnackbar(loginResponse?.data.message, { variant: "success" });
    return true;
  };

  const register = async (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    phoneNumber: string
  ) => {
    const registerResponse = await sendRegisterRequest(
      firstName,
      lastName,
      username,
      email,
      password,
      phoneNumber
    );
    if (registerResponse?.status !== 200) {
      enqueueSnackbar(registerResponse?.data.message, {
        variant: "error",
      });
      return false;
    }

    enqueueSnackbar(registerResponse?.data.message, { variant: "success" });
    return true;
  };

  const queryUser = async () => {
    if (checkTokenExpired()) {
      logout(true);
      return false;
    }
    const userInfoRequest = await sendUserInfoRequest();
    if (userInfoRequest?.status !== 200 || !userInfoRequest?.data) {
      setUser(null);
      return false;
    }
    const userData = userInfoRequest?.data;
    const membershipData = await getMembership(userData?.membership);

    setUser((prev) => {
      return {
        ...prev,
        ...userData,
        membershipData: membershipData?.data,
      };
    });
    return true;
  };

  const logout = (fromTokenExpired = false) => {
    setUser(null);
    localStorage.removeItem("token");
    handleNavigation("/");
    if (!fromTokenExpired) {
      enqueueSnackbar("You have been logged out.", {
        variant: "info",
      });
    } else {
      enqueueSnackbar("Session expired. Please log in again.", {
        variant: "info",
      });
    }
  };

  return (
    <userContext.Provider value={{ user, login, register, logout, queryUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
