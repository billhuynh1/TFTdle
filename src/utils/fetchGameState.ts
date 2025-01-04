import { fetchChampions } from "./fetchChampions.ts";
import fetchDailyChampion from "./fetchDailyChampion.ts";
import fetchSession from "./fetchSession.ts";
import fetchGuesses from "./fetchGuesses.ts";
import { Champion, ChampionGuess } from "../type.ts";

const fetchGameState = async (
  setSessionId: (id: string) => void,
  setChampionList: (list: Champion[]) => void,
  setGuessedChampions: (list: Champion[]) => void,
  setAttempts: (count: number) => void,
  setTestChampion: (champion: Champion) => void,
  setIsLoading: (loading: boolean) => void,
  setIsGameOver: (isGameOver: boolean) => void,
) => {
  try {
    const [championsData, dailyChampionData, sessionData] = await Promise.all([
      fetchChampions(),
      fetchDailyChampion(),
      fetchSession(),
    ]);
    console.log("New test: Daily champion data:", dailyChampionData);
    console.log("New test: session id: ", sessionData.sessionId);

    setSessionId(sessionData.sessionId);
    setChampionList(championsData);

    const guessedData = await fetchGuesses(sessionData.sessionId);
    console.log("Guessed data: ", guessedData);

    if (guessedData.length > 0) {
      setIsGameOver(guessedData[0].isCorrect);
    }
    const championNamesFromResponse: string[] = guessedData.map(
      (item: ChampionGuess) => item.champ,
    );
    const guessedChampionsList: Champion[] = championNamesFromResponse
      .map((name) => championsData.find((champ) => champ.name === name))
      .filter((champ): champ is Champion => champ !== undefined);

    console.log("test list", guessedChampionsList);
    setGuessedChampions(guessedChampionsList);
    setAttempts(guessedChampionsList.length);

    setTestChampion(dailyChampionData);
    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("error fetching data, refresh");
  }
};

export default fetchGameState;
