import axios from "axios";

const API_URL = "https://widgets-catb7yz54a-uc.a.run.app";

export const registerMentor = async (formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/registration/mentor`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error registering mentor:", error);
    throw error;
  }
};

export const loginMentor = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/login/user`, formData);
    return response.data;
  } catch (error) {
    console.error("Error logging in mentor:", error);
    throw error;
  }
};
