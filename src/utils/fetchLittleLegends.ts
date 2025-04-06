import supabase from "./supabaseClient";
import { LittleLegend } from "../type.ts";

const fetchLittleLegends = async (): Promise<LittleLegend[]> => {
  const cachedLittleLegends = localStorage.getItem("littleLegends");

  if (cachedLittleLegends) {
    const littleLegends: LittleLegend[] = JSON.parse(cachedLittleLegends);
    return littleLegends.map((item) => ({
      id: item.id,
      name: item.name,
      baseType: item.base_type,
      imageUrl: item.image_url,
    }));
  }

  const { data, error } = await supabase.from("little_legends").select("*");
  if (error) {
    throw error;
  }

  localStorage.setItem("little_legends", JSON.stringify(data));

  return data.map((item) => ({
    id: item.id,
    name: item.name,
    baseType: item.base_type,
    imageUrl: item.image_url,
  }));
};

export default fetchLittleLegends;
