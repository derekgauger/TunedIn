import { enqueueSnackbar } from "notistack";
import api from "../Utils/api";

export const sendTemplatedEmail = async (
  templateName: string,
  toEmail: string,
  parameters: any
) => {
  try {
    const response = await api.post("/Email/send-templated-email", {
      templateName: templateName,
      toEmail: toEmail,
      parameters: parameters,
    });
    return { data: response.data, error: null };
  } catch (error) {
    enqueueSnackbar("Failed to send email. Please try again later.", {
      variant: "error",
    });
    return { data: null, error: error };
  }
};
