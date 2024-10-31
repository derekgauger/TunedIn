import { enqueueSnackbar } from "notistack";
import api from "../Utils/api";

export const getForms = async () => {
  try {
    const response = await api.get("/form/get-forms");
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const uploadForm = async (formData: any) => {
  try {
    const response = await api.post("/protectedform/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const downloadForm = async (fileId: number) => {
  try {
    const response = await api.get(`/form/download/${fileId}`, {
      responseType: "blob",
    });
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const deleteForm = async (fileId: number) => {
  try {
    const response = await api.delete(`/protectedform/delete/${fileId}`);
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};
