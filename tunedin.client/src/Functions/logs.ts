import { enqueueSnackbar } from "notistack";
import api from "../Utils/api";

export const getLogs = async () => {
  try {
    const response = await api.get("/protectedlog/get-logs");
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const deleteLog = async (logId: number) => {
  try {
    const response = await api.delete(`/protectedlog/delete/${logId}`);
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};
