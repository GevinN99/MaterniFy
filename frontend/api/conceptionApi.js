import axiosInstance from "./axiosInstance";

export const getConceptionDate = async (userId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching conception date:", error);
    return null;
  }
};

export const saveConceptionDate = async (userId, date) => {
  try {
    const response = await axiosInstance.post(API_URL, { userId, date });
    return response.data;
  } catch (error) {
    console.error("Error saving conception date:", error);
  }
};

export const updateConceptionDate = async (userId, date) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${userId}`, { date });
    return response.data;
  } catch (error) {
    console.error("Error updating conception date:", error);
  }
};

export const deleteConceptionDate = async (userId) => {
  try {
    await axiosInstance.delete(`${API_URL}/${userId}`);
  } catch (error) {
    console.error("Error deleting conception date:", error);
  }
};
