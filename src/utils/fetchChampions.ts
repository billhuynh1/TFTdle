import supabase from "./supabaseClient";
import { Champion } from "../type.ts";

const fetchChampions = async (): Promise<Champion[]> => {
  const cachedChampions = localStorage.getItem("champions");

  if (cachedChampions) {
    const champions: Champion[] = JSON.parse(cachedChampions);
    if (champions.length > 0) {
      return champions;
    }
  }

  const { data, error } = await supabase.from("champions_set_13").select("*");
  if (error) {
    throw error;
  }

  localStorage.setItem("champions", JSON.stringify(data));

  return data || [];
};

export default fetchChampions;
