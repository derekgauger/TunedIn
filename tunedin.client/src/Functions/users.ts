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

export const sendChangePasswordRequest = async (
  currentPassword: string,
  newPassword: string,
  confirmNewPassword: string,
  email: string
) => {
  try {
    const response = await api.post("/auth/change-password", {
      currentPassword,
      newPassword,
      confirmNewPassword,
      email,
    });
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const sendForgotPasswordRequest = async (
  newPassword: string,
  confirmNewPassword: string,
  email: string
) => {
  try {
    const response = await api.post("/auth/forgot-password", {
      NewPassword: newPassword, // Match the C# model property names
      ConfirmNewPassword: confirmNewPassword,
      Email: email,
    });
    return response;
  } catch (error: any) {
    if (error.response?.data?.message) {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    }
    throw error; // Re-throw to be caught by the calling function
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
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data, {
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

export const updateMembershipRequestTime = async (username: string) => {
  try {
    const response = await api.put(
      `/protecteduser/update-membership-request?Username=${username}`
    );
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const setEmailVerificationCode = async (email: string) => {
  try {
    const response = await api.put(
      `/protecteduser/set-email-verification-code?Email=${email}`
    );
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const setEmailVerificationCodeAuth = async (email: string) => {
  try {
    const response = await api.put(
      `/auth/set-email-verification-code?Email=${email}`
    );
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const verifyEmailCode = async (email: string, code: string) => {
  try {
    const response = await api.put(
      `/protecteduser/verify-email-code?Email=${email}&VerificationCode=${code}`
    );
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const verifyEmailCodeAuth = async (email: string, code: string) => {
  try {
    const response = await api.put(
      `/auth/verify-email-code?Email=${email}&VerificationCode=${code}`
    );
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};
