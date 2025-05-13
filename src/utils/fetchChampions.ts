import supabase from "./supabaseClient";
import { Champion } from "../type";

const fetchChampions = async (): Promise<Champion[]> => {
  const cachedChampions = localStorage.getItem("champions");

  if (cachedChampions) {
    const champions = JSON.parse(cachedChampions);
    if (champions.length > 0) {
      return champions.map(
        (item: {
          imageUrl: string;
          name: string;
          gender: string;
          cost: number;
          type: string;
          traits: string;
          attRange: number;
        }) => ({
          imageUrl: item.image_url,
          name: item.name,
          gender: item.gender,
          cost: item.cost,
          type: item.type,
          traits: item.traits,
          attRange: item.att_range,
        }),
      );
    }
  }

  const { data, error } = await supabase.from("champions_set_13").select("*");
  if (error) {
    throw error;
  }

  localStorage.setItem("champions", JSON.stringify(data));

  return data.map(
    (item: {
      imageUrl: string;
      name: string;
      gender: string;
      cost: number;
      type: string;
      traits: string;
      attRange: number;
    }) => ({
      imageUrl: item.image_url,
      name: item.name,
      gender: item.gender,
      cost: item.cost,
      type: item.type,
      traits: item.traits,
      attRange: item.att_range,
    }),
  );
};

export default fetchChampions;
