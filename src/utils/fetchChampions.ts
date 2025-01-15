import supabase from "./supabaseClient";
import Champion from "../type.ts";

const fetchChampions = async (): Promise<Champion[]> => {
  const { data, error } = await supabase.from("champions_set_13").select("*");
  if (error) {
    throw error;
  }
  return data || [];
};

export default fetchChampions;
