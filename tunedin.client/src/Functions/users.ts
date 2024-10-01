import api from "../Utils/api";
import { User } from "../Utils/types";

export const sendLoginRequest = async (
  loginIdentifier: string,
  password: string
) => {
  try {
    const response = await api.post("/auth/login", {
      loginIdentifier,
      password,
    });
    localStorage.setItem("token", response.data.token);
    return response;
  } catch (error) {
    console.error("Login failed:", error.response.data.message);
  }
};

export const sendRegisterRequest = async (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  phoneNumber: string
) => {
  try {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.error("Registration failed:", error.response.data.message);
  }
};

export const sendUserInfoRequest = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Use token not found. Try logging in again.");
      return;
    }
    const response = await api.get("/protected/user-info");
    localStorage.setItem("user", JSON.stringify(response.data));
    return response;
  } catch (error) {
    console.error("User info request failed:", error.response.data.message);
  }
};

export const sendUserUpdateRequest = async (id: number, firstName: string, lastName: string, username: string, email: string, phoneNumber: string, goal: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Use token not found. Try logging in again.");
      return;
    }
    const response = await api.put("/protected/update-user", {
      id,
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      goal,
    });
    localStorage.setItem("user", JSON.stringify(response.data));
    return response;
  } catch (error) {
    console.error("User info update failed:", error.response.data.message);
  }
};
