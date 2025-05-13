import React from "react";
import fetchChampions from "./fetchChampions";
import fetchDailyChampion from "./fetchDailyChampion";
import { Champion } from "../type";

const fetchClassicGameState = async (
  setChampionList: (list: Champion[]) => void,
  setTestChampion: (champion: Champion) => void,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const [championsData, dailyChampionData] = await Promise.all([
      fetchChampions(),
      fetchDailyChampion(),
    ]);
    setChampionList(championsData);
    setTestChampion(dailyChampionData);
    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Server is messed up, refresh the page, or try again later!");
  }
};

export default fetchClassicGameState;
