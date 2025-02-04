// import axios from "axios";
// import { ChampionGuess } from "../type.ts";

// const fetchGuesses = async (sessionId: string): Promise<ChampionGuess[]> => {
//   const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

//   try {
//     const response = await axios.get(
//       `${API_BASE_URL}/guess/v2/${sessionId}/get`,
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching guesses", error);
//     throw error;
//   }
// };

// LOCAL STORAGE DEVELOPMENT
const fetchGuesses = (): string | null => {
  const guesses: string | null = localStorage.getItem("guesses");

  return guesses;
};

export default fetchGuesses;
