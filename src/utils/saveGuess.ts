import axios from "axios";

const saveGuess = async (
  champion: string,
  sessionId: string,
): Promise<void> => {
  await axios.post(`http://18.223.238.67:8080/guess/v2/${sessionId}/save`, {
    champ: champion,
    isCorrect: false,
  });
  console.log("Guessed saved for:", sessionId, champion, "added");
};

export default saveGuess;
