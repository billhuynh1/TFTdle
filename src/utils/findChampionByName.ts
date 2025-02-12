import Champion from "../type.ts";

// const findChampionByNameInTable = async (
//   champs: string[],
// ): Promise<Champion[]> => {
//   const { data, error } = await supabase
//     .from("champions_set_13")
//     .select("*")
//     .in("name", champs);
//   if (error) {
//     return [];
//   }
//   return data && data.length > 0 ? data : [];
// };

const findChampionByNameInTable = (
  champs: string[],
  champList: Champion[],
): Champion[] => {
  const champObjects = champs.map(
    (name) => champList.find((champ) => champ.name === name)!,
  );
  return champObjects.reverse();
};

export default findChampionByNameInTable;
