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

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
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
    console.log("Register response:", registerResponse?.data.message);
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
    const userInfoRequest = await sendUserInfoRequest();
    const userData = userInfoRequest?.data;
    const membershipData = await getMembership(userData?.membership);
    setUser((prev) => {
      return {
        ...prev,
        ...userData,
        membershipData: membershipData?.data,
      };
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    enqueueSnackbar("Logout successful!", { variant: "info" });
  };

  return (
    <userContext.Provider value={{ user, login, register, logout, queryUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
