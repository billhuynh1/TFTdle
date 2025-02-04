import axios from "axios";

// const saveGuess = async (
//   champion: string,
//   sessionId: string,
// ): Promise<void> => {
//   const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
//   await axios.post(`${API_BASE_URL}/guess/v2/${sessionId}/save`, {
//     champ: champion,
//     isCorrect: false,
//   });
//   console.log("Guessed saved for:", sessionId, champion, "added");
// };

// LOCAL STORAGE DEVELOPMENT
const saveGuess = (guesses: string[]) => {
  localStorage.setItem("guesses", JSON.stringify(guesses));
};

export default saveGuess;
