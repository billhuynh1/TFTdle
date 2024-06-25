import { useState } from "react";
import { Champion } from "../type";
import { fetchChampions } from "../utils/fetchChampions";
import SubmitButton from "./SubmitButton";
import supabase from "../utils/supabaseClient";

interface searchBarProps {
    searchResults: Champion[],
    searchValue: string,
}

const SearchBar: React.FC<searchBarProps> = () => {

    const [input, setInput] = useState<string>("");

    const handleSearch = async (value: string) => {

        const { data, error } = await supabase
            .from("champions")
            .select()
            .textSearch("name", `${value}`)
        
    }


    return (
        <div className="searchbar">
            <form>
                <input
                    type="text"
                    id="guess"
                    className="searchbar"
                    placeholder="Type champion name ..."
                    onChange={}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default SearchBar;