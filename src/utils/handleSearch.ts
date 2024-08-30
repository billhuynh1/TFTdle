import supabase from "./supabaseClient.js";

export const handleSearch = async (searchTerm: string) => {
  try {
    const { data, error } = await supabase
      .from("champions")
      .select("*")
      .ilike("name", `%${searchTerm}%`);
  } catch (error) {
    console.error("Error fetching champions", error);
  }
};
