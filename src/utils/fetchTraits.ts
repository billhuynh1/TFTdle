import supabase from "./supabaseClient";
import { Trait } from "../type.ts";

const fetchTraits = async (): Promise<Trait[]> => {
  const cachedTraits = localStorage.getItem("traits");

  if (cachedTraits) {
    const traits: Trait[] = JSON.parse(cachedTraits);
    return traits.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      champs: item.champs,
      imageUrl: item.image_url,
      set: item.set,
    }));
  }

  const { data, error } = await supabase.from("traits").select("*");
  if (error) {
    throw error;
  }

  localStorage.setItem("traits", JSON.stringify(data));

  return data.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    champs: item.champs,
    imageUrl: item.image_url,
    set: item.set,
  }));
};

export default fetchTraits;
