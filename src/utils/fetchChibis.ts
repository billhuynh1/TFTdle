import supabase from "./supabaseClient";
import { Chibi } from "../type";

const fetchChibis = async (): Promise<Chibi[]> => {
  const cachedChibis = localStorage.getItem("chibis");

  if (cachedChibis) {
    const chibis: Chibi[] = JSON.parse(cachedChibis);
    return chibis.map((item) => ({
      id: item.id,
      name: item.name,
      imageUrl: item.image_url,
      gifUrl: item.gif_url,
    }));
  }

  const { data, error } = await supabase.from("chibis").select("*");
  if (error) {
    throw error;
  }

  localStorage.setItem("chibis", JSON.stringify(data));

  return data.map((item) => ({
    id: item.id,
    name: item.name,
    imageUrl: item.image_url,
    gifUrl: item.gif_url,
  }));
};

export default fetchChibis;
