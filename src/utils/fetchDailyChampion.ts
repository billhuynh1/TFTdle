import axios from "axios";
import Champion from "../type.ts";

const fetchDailyChampion = async (): Promise<Champion> => {
  try {
    const response = await axios.get(
      `https://0g62r8n5nl.execute-api.us-east-2.amazonaws.com/prod/champs/v1/daily`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching daily champion:", error);
    throw error;
  }
};

export default fetchDailyChampion;
