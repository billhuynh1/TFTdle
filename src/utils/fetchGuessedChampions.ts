import Champion from "../type.ts";
import { fetchChampions } from "./fetchChampions.ts";

const fetchGuessedChampions = async (champs: Champion[]) => {
  if (champs === undefined) return [];

  const allChampions = await fetchChampions();
  const guessedChampions = new Set(champs.map((champ) => champ.name));

  return allChampions
    .filter((champ) => guessedChampions.has(champ.name))
    .reverse();
};

export default fetchGuessedChampions;
