import axios from "axios";
import Champion from "../type.ts";

const fetchDailyChampion = async (): Promise<Champion> => {
  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

  try {
    const response = await axios.get(`${API_BASE_URL}/champs/v1/daily`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching daily champion:", error);
    throw error;
  }
};

export default fetchDailyChampion;
