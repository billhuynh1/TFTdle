import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "./Button.tsx";

interface SearchBarsProps<T> {
  items: T[];
  guessedItems: T[];
  setGuessedItems: React.Dispatch<React.SetStateAction<T[]>>;
  setAttempts: React.Dispatch<React.SetStateAction<number>>;
}

// GENERIC VERSION, NEEDS TESTING
const SearchBars = <T extends { name: string; imageUrl: string }>({
  items,
  guessedItems,
  setGuessedItems,
  setAttempts,
}: SearchBarsProps<T>) => {
  const [input, setInput] = useState<string>("");
  const [filteredItems, setfilteredItems] = useState<T[]>([]);
  const [isListOpen, setIsListOpen] = useState(false);
  const [guesses, setGuesses] = useState<string[]>(() => {
    const storedGuesses = localStorage.getItem("guesses");
    return storedGuesses ? JSON.parse(storedGuesses) : [];
  });
  const imagePath = `${process.env.REACT_APP_AWS_S3_URL}chibi_images/`;
  const location = useLocation();
  const mode = location.pathname.replace("/", "");

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.length) {
      const regex = new RegExp(`${searchQuery.toLowerCase()}`);
      const guessedItemNames = new Set(
        guessedItems.map((item) => item.name.toLowerCase()),
      );

      const newfilteredItems = items.filter((item: T) => {
        const normalizedItemName = item.name.toLowerCase();
        return (
          regex.test(normalizedItemName) &&
          !guessedItemNames.has(normalizedItemName)
        );
      });
      setfilteredItems([...newfilteredItems]);
      setIsListOpen(true);
    } else {
      setfilteredItems([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    const regex = /[a-zA-Z]+$/i;

    if (newInput === "" || regex.test(newInput)) {
      setInput(newInput);
      handleSearch(newInput);
    }
  };

  const handleSelectedItem = async (item: T) => {
    setIsListOpen(false);
    setInput("");
    setAttempts((attempts) => attempts + 1);
    setGuesses((prev) => [...prev, item.name]);
    setGuessedItems((prev) => [item, ...prev]);
  };

  useEffect(() => {
    localStorage.setItem(`${mode}_guesses`, JSON.stringify(guesses));
  }, [guesses]);

  const handleKeyInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (
        filteredItems.length > 0 &&
        !guessedItems.includes(filteredItems[0])
      ) {
        handleSelectedItem(filteredItems[0]);
      }
    }
  };

  const handleClick = () => {
    if (guessedItems.includes(filteredItems[0])) {
      // Fix this
    } else if (input === filteredItems[0].name) {
      handleSelectedItem(filteredItems[0]);
    }
  };

  // Returns list of champions from query
  const renderedItems =
    filteredItems.length > 0 && isListOpen ? (
      <ul className="champion-list">
        {filteredItems.map((item: T) => (
          <button
            className="champion-list-item"
            type="button"
            key={item.name}
            onClick={() => handleSelectedItem(item)}
          >
            <img
              src={`${imagePath}${item.imageUrl}`}
              loading="eager"
              alt="A list of champions"
              className="champion-image-list"
              width={40}
              height={40}
            />
            {item.name.replaceAll("_", " ")}
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
      {renderedItems}
    </div>
  );
};

export default SearchBars;
