import fetchChampions from "./fetchChampions.ts";
import fetchDailyChampion from "./fetchDailyChampion.ts";
import { Champion } from "../type.ts";

const fetchGameState = async (
  setChampionList: (list: Champion[]) => void,
  setGuessedChampions: (list: Champion[]) => void,
  setAttempts: (count: number) => void,
  setTestChampion: (champion: Champion) => void,
) => {
  try {
    const [championsData, dailyChampionData] = await Promise.all([
      fetchChampions(),
      fetchDailyChampion(),
    ]);
    setChampionList(championsData);
    setTestChampion(dailyChampionData);
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Error fetching data, refresh the page, or try again later!");
  }
};

export default fetchGameState;
