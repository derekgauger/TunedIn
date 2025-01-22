import { enqueueSnackbar } from "notistack";
import api from "../Utils/api";

export const getPictures = async () => {
  try {
    const response = await api.get("/protectedgallery");
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const uploadPicture = async (formData: any) => {
  try {
    const response = await api.post("/protectedgallery/upload", formData, {
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

export const deletePicture = async (pictureId: number) => {
  try {
    const response = await api.delete(`/protectedgallery/${pictureId}`);
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};
