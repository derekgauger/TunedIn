/* eslint-disable @typescript-eslint/no-explicit-any */
import { enqueueSnackbar } from "notistack";
import api from "../Utils/api";

export const getMemberships = async () => {
  try {
    const response = await api.get('/membership');
    return response;
  } catch (error : any) {
    enqueueSnackbar(error.response.data.message, {
      variant: 'error',
    });
  }
}

export const getMembership = async (title: string | undefined) => {
  if (!title || title === 'None') {
    return;
  }
  try {
    const response = await api.get(`/membership/${title}`);
    return response;
  } catch (error : any) {
    enqueueSnackbar(error.response.data.message, {
      variant: 'error',
    });
  }
}