import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_URL = API_BASE_URL;

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
    alert("email or password Incorrect");
    console.error("Error logging in mentor:", error);
    throw error;
  }
};
