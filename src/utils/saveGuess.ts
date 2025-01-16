import axios from "axios";

const saveGuess = async (
  champion: string,
  sessionId: string,
): Promise<void> => {
  await axios.post(
    `https://0g62r8n5nl.execute-api.us-east-2.amazonaws.com/prod/guess/v2/${sessionId}/save`,
    {
      champ: champion,
      isCorrect: false,
    },
  );
  console.log("Guessed saved for:", sessionId, champion, "added");
};

export default saveGuess;
