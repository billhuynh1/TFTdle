import supabase from "./supabaseClient";

const findChampionByName = async (champ: string) => {
  const { data, error } = await supabase
    .from("champions")
    .select("*")
    .eq("name", champ);

  if (error) {
    console.error("Error fetching champ by name", error);
    return null;
  }

  return data && data.length > 0 ? data[0] : null;
};

export default findChampionByName;
