import api from "../Utils/api";

export const getMemberships = async () => {
  try {
    const response = await api.get('/membership');
    return response;
  } catch (error) {
    console.error('Login failed:', error.response.data.message);
  }
}

export const getMembership = async (title: string | undefined) => {
  if (!title || title === 'None') {
    return;
  }
  try {
    const response = await api.get(`/membership/${title}`);
    return response;
  } catch (error) {
    console.error('Login failed:', error.response.data.message);
  }
}