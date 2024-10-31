/* eslint-disable @typescript-eslint/no-explicit-any */
import { enqueueSnackbar } from "notistack";
import api from "../Utils/api";

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
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
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
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const sendGetAllUsers = async () => {
  try {
    const response = await api.get("/protecteduser/all-users");
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const sendGetUserByUsername = async (username: string) => {
  try {
    const response = await api.get(`/protecteduser/user-by-username`, {
      params: { Username: username },
    });
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const sendUserInfoRequest = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    // Decode the token to check its expiration
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const isTokenExpired = tokenPayload.exp * 1000 < Date.now();
    if (isTokenExpired) {
      console.error("Token has expired. Please log in again.");
      enqueueSnackbar("Session expired. Please log in again.", {
        variant: "error",
      });
      localStorage.removeItem("token");
      return;
    }
    const response = await api.get("/protecteduser/user-info");
    localStorage.setItem("user", JSON.stringify(response.data));
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const sendUserUpdateRequest = async (
  id: number,
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  phoneNumber: string,
  goal: string,
  membership: string
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Use token not found. Try logging in again.");
      return;
    }
    const response = await api.put("/protecteduser/update-user", {
      id,
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      goal,
      membership,
    });
    localStorage.setItem("user", JSON.stringify(response.data));
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const sendUserDeleteRequest = async (username: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const response = await api.delete(`/protecteduser/delete-account`, {
      params: {
        usernameToDelete: username,
      },
    });
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};
