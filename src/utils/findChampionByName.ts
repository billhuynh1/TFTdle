import Champion from "../type.ts";
import supabase from "./supabaseClient";

const findChampionByNameInTable = async (
  champs: string[],
): Promise<Champion[]> => {
  const { data, error } = await supabase
    .from("champions_set_13")
    .select("*")
    .in("name", champs);
  if (error) {
    return [];
  }
  return data && data.length > 0 ? data : [];
};

export default findChampionByNameInTable;
