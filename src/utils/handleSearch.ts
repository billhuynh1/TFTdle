import supabase from "./supabaseClient.js";

export const handleSearch = async (searchTerm: string) => {
  try {
    const { data, error } = await supabase
      .from("champions_set_13")
      .select("*")
      .ilike("name", `%${searchTerm}%`);
  } catch (error) {
    console.error("Error fetching champions", error);
  }
};
