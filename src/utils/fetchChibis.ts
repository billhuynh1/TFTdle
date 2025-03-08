import supabase from "./supabaseClient";
import { Chibi } from "../type.ts";

const fetchChibis = async (): Promise<Chibi[]> => {
  const { data, error } = await supabase.from("chibi").select("*");
  if (error) {
    throw error;
  }
  return data.map((item) => ({
    name: item.name,
    imageUrl: item.image_url, // Renaming the image_url to imageUrl
  }));
};

export default fetchChibis;
