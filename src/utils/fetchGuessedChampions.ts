import Champion from "../type";

const fetchGuessedChampions = async (
  guessedChamps: Champion[],
  allChampions: Champion[],
): Promise<Champion[]> => {
  if (guessedChamps === undefined) return [];
  const guessedChampions = new Set(guessedChamps.map((champ) => champ.name));

  return allChampions
    .filter((champ) => guessedChampions.has(champ.name))
    .reverse();
};

export default fetchGuessedChampions;
