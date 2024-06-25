import supabase from "./supabaseClient";
import { Champion } from "../type";


export const fetchChampions = async (): Promise<Champion[]> => {
    const { data, error } = await supabase.from("champions").select("*").eq('id', 1);

    if (error) {
      throw error;
    }
    
    return data || [];
}

