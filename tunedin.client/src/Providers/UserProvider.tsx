import React, { useState, useEffect, ReactNode } from "react";
import { User } from "../Utils/types";
import userContext from "../Contexts/UserContext";
import {
  sendLoginRequest,
  sendRegisterRequest,
  sendUserInfoRequest,
} from "../Functions/users";
import { getMembership } from "../Functions/memberships";

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
    const userInfoRequest = await sendUserInfoRequest();
    const userData = userInfoRequest?.data;
    setUser(userData);
    return loginResponse;
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
    return registerResponse;
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
  };

  return (
    <userContext.Provider value={{ user, login, register, logout, queryUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
