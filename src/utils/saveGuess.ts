import axios from "axios";

const saveGuess = async (
  champion: string,
  sessionId: string,
): Promise<void> => {
  await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/guess/v2/${sessionId}/save`,
    {
      champ: champion,
      isCorrect: false,
    },
  );
  console.log("Guessed saved for:", sessionId, champion, "added");
};

export default saveGuess;
