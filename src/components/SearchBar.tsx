import React, { useEffect, useState } from "react";
import { Champion } from "../type.ts";
import Button from "./Button.tsx";

interface SearchBarProps {
  championList: Champion[];
  guessedChampions: Champion[];
  setGuessedChampions: React.Dispatch<React.SetStateAction<Champion[]>>;
  setAttempts: React.Dispatch<React.SetStateAction<number>>;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  correctChampion?: Champion | null;
  sessionId: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  championList,
  guessedChampions,
  correctChampion,
  sessionId,
  setGuessedChampions,
  setAttempts,
  setIsGameOver,
}) => {
  const [input, setInput] = useState<string>("");
  const [filteredChampions, setFilteredChampions] = useState<Champion[]>([]);
  const [isListOpen, setIsListOpen] = useState(false);
  const [guesses, setGuesses] = useState<string[]>(() => {
    const storedGuesses = localStorage.getItem("guesses");
    return storedGuesses ? JSON.parse(storedGuesses) : [];
  });
  const imagePath = process.env.REACT_APP_AWS_S3_URL;

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.length) {
      const regex = new RegExp(`^${searchQuery.toLowerCase()}`);
      const guessedChampionNames = new Set(
        guessedChampions.map((champion) => champion.name.toLowerCase()),
      );

      const newFilteredChampions = championList.filter((champ: Champion) => {
        const normalizedChampName = champ.name.toLowerCase();
        return (
          regex.test(normalizedChampName) &&
          !guessedChampionNames.has(normalizedChampName)
        );
      });
      setFilteredChampions([...newFilteredChampions]);
      setIsListOpen(true);
    } else {
      setFilteredChampions([]);
    }
  };

  // Remove the any type, senior dev might crash out
  const handleChange = (e: any) => {
    const newInput = e.target.value;
    const regex = /[a-zA-Z]+$/i;

    if (newInput === "" || regex.test(newInput)) {
      setInput(newInput);
      handleSearch(newInput);
    }
  };

  const handleSelectedChampion = async (champ: Champion) => {
    setIsListOpen(false);
    setInput("");
    setAttempts((attempts) => attempts + 1);
    setGuesses((prev) => [...prev, champ.name]);
    setGuessedChampions((prev) => [champ, ...prev]);
  };

  useEffect(() => {
    localStorage.setItem("guesses", JSON.stringify(guesses));
  }, [guesses]);

  const handleKeyInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (
        filteredChampions.length > 0 &&
        !guessedChampions.includes(filteredChampions[0])
      ) {
        handleSelectedChampion(filteredChampions[0]);
      }
    }
  };

  const handleClick = () => {
    if (guessedChampions.includes(filteredChampions[0])) {
      // Fix this
    } else if (input === filteredChampions[0].name) {
      handleSelectedChampion(filteredChampions[0]);
    }
  };

  // Returns list of champions from query
  const renderedChampions =
    filteredChampions.length > 0 && isListOpen ? (
      <ul className="champion-list">
        {filteredChampions.map((champ: Champion) => (
          <button
            className="champion-list-item"
            type="button"
            key={champ.name}
            onClick={() => handleSelectedChampion(champ)}
          >
            <img
              src={`${imagePath}${champ.imageurl}`}
              loading="eager"
              alt="A list of champions"
              className="champion-image-list"
              width={40}
              height={40}
            />
            {champ.name.replaceAll("_", " ")}
          </button>
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
        <Button icon="images/golden_spat.png" onClick={handleClick} />
      </div>
      {renderedChampions}
    </div>
  );
};

export default SearchBar;
