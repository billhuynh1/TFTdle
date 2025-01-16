import axios from "axios";
import { ChampionGuess } from "../type.ts";

const fetchGuesses = async (sessionId: string): Promise<ChampionGuess[]> => {
  try {
    const response = await axios.get(
      `https://0g62r8n5nl.execute-api.us-east-2.amazonaws.com/prod/guess/v2/${sessionId}/get`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching guesses", error);
    throw error;
  }
};

export default fetchGuesses;
