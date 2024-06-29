import supabase from "./supabaseClient";
import { Champion } from "../type";


export const fetchChampions = async (): Promise<Champion[]> => {
    const { data, error } = await supabase.from("champions").select("*");

    if (error) {
      throw error;
    }
    return data || [];
}

