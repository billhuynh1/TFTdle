import axios from "axios";
import Champion from "../type.ts";

const fetchDailyChampion = async (
  attempt: number = 1,
  maxRetries: number = 3,
  delay: number = 1000,
): Promise<Champion> => {
  const API_BASE_URL = process.env.REACT_APP_BACKEND_DEVELOPMENT_URL;

  try {
    const response = await axios.get(`${API_BASE_URL}/champs/v1/daily`);
    return response.data;
  } catch (error) {
    console.error(`Fetching daily champ attempt: ${attempt} failed:`, error);

    if (attempt >= maxRetries) {
      console.error("Max retries reached. Failing request.");
      throw error;
    }

    await new Promise((resolve) => {
      setTimeout(resolve, delay * 2 ** (attempt - 1));
    });

    return fetchDailyChampion(attempt + 1);
  }
};

export default fetchDailyChampion;
