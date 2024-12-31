import axios from "axios";
import { ChampionGuess } from "../type.ts";

const fetchGuesses = async (sessionId: string): Promise<ChampionGuess[]> => {
  try {
    const response = await axios.get(
      `http://localhost:8080/guess/v2/${sessionId}/get`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching guesses", error);
    throw error;
  }
};

export default fetchGuesses;
