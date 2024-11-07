import findChampionByName from "./findChampionByName.ts";

const fetchGuessedChampions = async (champs: string[]) => {
  const promises = champs.map((champ) => findChampionByName(champ));
  const champList = await Promise.all(promises);
  return champList.filter((champ) => champ !== null).reverse();
};

export default fetchGuessedChampions;
