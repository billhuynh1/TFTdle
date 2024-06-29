import { useEffect, useState } from "react";
import { Champion } from "../type";
import supabase from "../utils/supabaseClient";
import compareChampions from "../utils/compareChampions";

interface SearchBarProps {
    championList: Champion[];
    guessedChampions: Champion[];
    setGuessedChampions: React.Dispatch<React.SetStateAction<Champion[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ championList, guessedChampions, setGuessedChampions }) => {

    const [input, setInput] = useState<string>("");
    const [filteredChampions, setFilteredChampions] = useState<Champion[]>([]);
    const [isListOpen, setIsListOpen] = useState(false);

    const handleSearch = async (searchQuery: string) => {   
        if(searchQuery.length) {
            const regex = new RegExp(`^${searchQuery.toLowerCase()}`);        
            const newFilteredChampions = championList.filter((champ: Champion) => {          
                return regex.test(champ.name.toLowerCase()) && !guessedChampions.includes(champ);
            })
    
            setFilteredChampions([...newFilteredChampions]);
            setIsListOpen(true);
        }
        else {
            setFilteredChampions([]);
        }
    }
    
    const handleChange = (e:any) => {
        const newInput = e.target.value
        const regex = /[a-zA-Z]+$/i;

        if (newInput === "" || regex.test(newInput)) {
            setInput(newInput);
            handleSearch(newInput);
        }
    }

    const handleSelectChampion = (champ: Champion) => {
        setGuessedChampions(prev => [champ, ...prev]);
        setIsListOpen(false);
        setInput("");
    }

    const renderedChampions = filteredChampions.length > 0 && isListOpen ? (
            <ul className="champion-list">
                {filteredChampions.map((champ: Champion) => (
                    <li className="champion-list-item" key={champ.name} onClick={() => handleSelectChampion(champ)}>
                        {champ.name}
                    </li>
                ))}
            </ul>
    ) : null;

    return (
        <div className="searchbar">
                <input
                    type="text"
                    id="guess"
                    placeholder="Type champion name ..."
                    onChange={handleChange}
                    value={input}
                />
                {renderedChampions}
        </div>
    )
}

export default SearchBar;