import { useState } from "react";
import { Champion } from "../type";
import supabase from "../utils/supabaseClient";

interface searchBarProps {
    championList: Champion[] | any;
}

const SearchBar: React.FC<searchBarProps> = ({ championList }) => {

    const [input, setInput] = useState<string>("");

    const handleChange = async (e:any) => {
        setInput(e.target.value.toLowerCase());
        handleSearch(input);
    }

    console.log(input);


    const handleSearch = async (value: string) => {
        const { data, error } = await supabase
            .from("champions")
            .select("*")
            .ilike("name", `${value}`)
    }


    return (
        <div className="searchbar">
            <form>
                <input
                    type="text"
                    id="guess"
                    className="searchbar"
                    placeholder="Type champion name ..."
                    onChange={handleChange}
                />
                <div className="champion-list">
                    <ul>
                        {championList.map((champ:any) => {
                            <li key={champ.id}>
                                {champ.name}
                            </li>
                        })}
                    </ul>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default SearchBar;