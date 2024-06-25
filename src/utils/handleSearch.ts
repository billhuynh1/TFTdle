import { useState } from "react";
import supabase from "./supabaseClient";
import { Champion } from "../type";


export const handleSearch = async(searchTerm: string) => {
    const [searchedChampion, setSearchedChampion] = useState<Champion>();

    try {
        const { data, error } = await supabase
            .from("champions")
            .select("*")
            .ilike("name", `%${searchTerm}%`)
    } catch (error) {
        console.error("Error fetching champions", error);
    }
}