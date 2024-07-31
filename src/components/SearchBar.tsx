import React, { useEffect, useState } from "react";
import { Champion } from "../type";
import Button from "./Button";

interface SearchBarProps {
    championList: Champion[];
    guessedChampions: Champion[];
    setGuessedChampions: React.Dispatch<React.SetStateAction<Champion[]>>;
    setAttempts: React.Dispatch<React.SetStateAction<number>>;
    setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
    correctChampion?: Champion | null;
}

const SearchBar: React.FC<SearchBarProps> = ({ championList, guessedChampions, correctChampion, setGuessedChampions, setAttempts, setIsGameOver }) => {

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

        if ( newInput === "" || regex.test(newInput )) {
            setInput(newInput);
            handleSearch(newInput);
        }
    }

    const handleSelectChampion = (champ: Champion) => {
        setGuessedChampions(prev => [champ, ...prev]);
        setIsListOpen(false);
        setInput("");
        setAttempts(attempts => attempts + 1);
        if (correctChampion && correctChampion.name === champ.name) {
            setIsGameOver(true);
        }
    }

    const handleKeyInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if ( event.key === "Enter" ) {
            if (filteredChampions.length > 0) {
                handleSelectChampion(filteredChampions[0]);
            }
        }
    }
    
    // FIX THIS!!!!
    const handleClick = () => {
        if (guessedChampions.includes(filteredChampions[0])) {
            return;
        } else if (input == filteredChampions[0].name) {
            handleSelectChampion(filteredChampions[0]);
        }
    };

    // Returns list of champions from query
    const renderedChampions =
        filteredChampions.length > 0 && isListOpen ? (
            <ul className="champion-list">
                {filteredChampions.map((champ: Champion) => (
                    <li
                        className="champion-list-item"
                        key={champ.name}
                        onClick={() => handleSelectChampion(champ)}
                    >
                        <img
                            src={`images/${champ.imageurl}`} 
                            alt="Champion list image" 
                            className="champion-image-list"
                        />
                        {champ.name}
                    </li>
                ))}
            </ul>
        ) : null;
    
    return (
        <div className="searchbar-main-container">
            <div className="searchbar-sub-container">
                <input
                    type="text"
                    id="guess"
                    className="search-bar"
                    placeholder="Type champion name ..."
                    autoComplete="off"
                    onChange={handleChange}
                    onKeyDown={handleKeyInput}
                    value={input}
                />
                <Button 
                    icon="images/golden_spat.png" 
                    onClick={handleClick}
                />
            </div>
                {renderedChampions}
        </div>
    )
}

export default SearchBar;