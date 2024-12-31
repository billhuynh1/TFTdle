import { fetchChampions } from "./fetchChampions.ts";
import fetchDailyChampion from "./fetchDailyChampion.ts";
import fetchSession from "./fetchSession.ts";
import fetchGuesses from "./fetchGuesses.ts";
import fetchGuessedChampions from "./fetchGuessedChampions.ts";
import findChampionByNameInTable from "./findChampionByName.ts";
import { Champion, ChampionGuess } from "../type.ts";

const fetchGameState = async (
  setSessionId: (id: string) => void,
  setChampionList: (list: Champion[]) => void,
  setGuessedChampions: (list: Champion[]) => void,
  setAttempts: (count: number) => void,
  setTestChampion: (champion: Champion) => void,
  setIsLoading: (loading: boolean) => void,
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

    const championNamesFromResponse: string[] = guessedData.map(
      (item: ChampionGuess) => item.champ,
    );
    const listOfChampionFromTable = await findChampionByNameInTable(
      championNamesFromResponse,
    );
    const champions = await fetchGuessedChampions(
      listOfChampionFromTable,
      championsData,
    );

    setGuessedChampions([...champions]);
    setAttempts(champions.length);
    setTestChampion(dailyChampionData);
    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("error fetching data, refresh");
  }
};

export default fetchGameState;
