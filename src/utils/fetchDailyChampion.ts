import axios from "axios";
import Champion from "../type.ts";

const fetchDailyChampion = async (): Promise<Champion> => {
  try {
    const response = await axios.get("http://localhost:8080/champs/v1/daily", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching daily champion:", error);
    throw error;
  }
};

export default fetchDailyChampion;
