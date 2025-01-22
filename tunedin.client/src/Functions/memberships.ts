/* eslint-disable @typescript-eslint/no-explicit-any */
import { enqueueSnackbar } from "notistack";
import api from "../Utils/api";
import { User } from "../Utils/types";
import { sendTemplatedEmail } from "./email";
import { SENDING_EMAIL } from "../Constants/contactInfo";
import { updateMembershipRequestTime } from "./users";

export const getMemberships = async () => {
  try {
    const response = await api.get("/membership");
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const getMembership = async (title: string | undefined) => {
  if (!title || title === "None") {
    return;
  }
  try {
    const response = await api.get(`/membership/${title}`);
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const requestChangeMembership = async (
  userDetails: User | undefined,
  requestedMembership: string
) => {
  if (!userDetails) {
    enqueueSnackbar("Failed to request membership change", {
      variant: "error",
    });
    return;
  }
  const emailParameters = {
    Username: userDetails?.username,
    CurrentMembership: userDetails?.membershipData?.title ?? "None",
    RequestedMembership: requestedMembership,
    Email: userDetails?.email,
    PhoneNumber: userDetails?.phoneNumber,
  };
  await updateMembershipRequestTime(userDetails?.username);
  const emailResponse = await sendTemplatedEmail(
    "changeMembershipRequest",
    SENDING_EMAIL,
    emailParameters
  );
  if (!emailResponse?.error) {
    enqueueSnackbar(
      "Membership change request sent successfully. We will get back to you as soon as possible.",
      {
        variant: "success",
      }
    );
  } else {
    enqueueSnackbar(emailResponse?.data.message, { variant: "error" });
  }
};

export const requestCancelMembership = async (
  userDetails: User | undefined
) => {
  if (!userDetails || !userDetails?.membershipData) {
    enqueueSnackbar("Failed to cancel membership", { variant: "error" });
    return;
  }
  const emailParameters = {
    Username: userDetails.username,
    Membership: userDetails.membershipData.title,
    Email: userDetails.email,
    PhoneNumber: userDetails.phoneNumber,
  };
  await updateMembershipRequestTime(userDetails?.username);
  const response = await sendTemplatedEmail(
    "cancelMembershipRequest",
    SENDING_EMAIL,
    emailParameters
  );
  if (!response?.error) {
    enqueueSnackbar(
      "Membership cancellation request sent successfully. We will get back to you as soon as possible.",
      {
        variant: "success",
      }
    );
  } else {
    enqueueSnackbar(response?.data.message, { variant: "error" });
  }
};
