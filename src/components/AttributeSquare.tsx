import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Champion } from "../type.ts";
import { useGame } from "../context/GameContext.tsx";
import { useSearchLock } from "../context/SearchLockContext.tsx";
import { useChampionContext } from "../context/ChampionContext.tsx";
import checkPartialGuess from "../utils/checkPartialGuess.ts";
import { updateFinishedGameModes } from "../utils/updateFinishedGameModes.ts";

interface AttributeSquareProps {
  pos: keyof Champion;
  champion: Champion;
}

const AttributeSquare: React.FC<AttributeSquareProps> = ({ pos, champion }) => {
  const [squareColor, setSquareColor] = useState<string>("");
  const [fontSize, setFontSize] = useState<number[]>([]); // Starting font size
  const [wordsArray, setWordsArray] = useState<string[] | number[]>([]);
  const imagePath = `${process.env.REACT_APP_AWS_S3_URL}champions_set_13_assets/`;
  const { testChampion } = useChampionContext();
  const { setIsGameOver } = useGame();
  const { setIsSearchLock } = useSearchLock();
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // TODO: Refactor the logic
  useEffect(() => {
    if (!testChampion || !champion) return;

    if (champion.name === testChampion.name) {
      setIsSearchLock(true);
      updateFinishedGameModes(location.pathname);
      setTimeout(() => {
        setIsGameOver(true);
      }, 5000);
    }
    if (champion[pos] === testChampion[pos]) {
      setSquareColor("correct");
    } else if (
      checkPartialGuess(
        String(champion?.[pos] ?? ""),
        String(testChampion?.[pos] ?? ""),
      )
    ) {
      setSquareColor("partial");
    } else {
      setSquareColor("incorrect");
    }
  }, [champion[pos]]);

  const isImage = (url: string | number) => {
    if (typeof url !== "string") {
      return false;
    }
    const regex = /\.(jpg|jpeg|png|gif|bmp|svg)$/;
    return regex.test(url);
  };

  // Dynamic font size
  useEffect(() => {
    const resizeText = () => {
      if (!containerRef.current) return;
      if (String(champion[pos]).includes(" ")) {
        // Logic about something to do with if the string only has 2 words
        // in a single string i.e "Form Swapper", keep it both on one line
      }
      const containerWidth = containerRef.current.offsetWidth;
      const matchedWords = String(champion[pos]).match(/[^,]+(,|$)/g);
      const wordsArray = matchedWords
        ? matchedWords.map((word) => word.trim())
        : [];
      const newFontSize = wordsArray.map(() => 16); // Starting font size
      // Check if the text fits inside the container
      wordsArray.forEach((word, index) => {
        const tempSpan = document.createElement("span");
        tempSpan.style.fontSize = `${newFontSize[index]}px`;
        tempSpan.style.whiteSpace = "nowrap"; // Prevent wrapping
        tempSpan.innerText = word;

        // Append to body to calculate width of word
        document.body.appendChild(tempSpan);
        const wordWidth = tempSpan.offsetWidth;
        document.body.removeChild(tempSpan); // Clean up

        // Shrink word size if it overflows
        while (wordWidth > containerWidth && newFontSize[index] > 10) {
          newFontSize[index] -= 1; // Decrease font size
          tempSpan.style.fontSize = `${newFontSize}px`;
          tempSpan.innerText = word;
          document.body.appendChild(tempSpan);
          document.body.removeChild(tempSpan);
        }
      });
      setWordsArray(wordsArray); // Update words array
      setFontSize(newFontSize); // Update font size
    };

    resizeText(); // Initial check when component mounts
  }, [champion, pos]);

  const renderImage = (url: string) => {
    return (
      <div className="champion-image-container">
        <img
          className="champion-image"
          src={`${imagePath}${url}`}
          alt="Champion"
          width={75}
          height={75}
        />
        <div className="champion-name-tooltip">{champion.name}</div>
      </div>
    );
  };

  const renderAttributeSquare = () => {
    return !(champion[pos] === champion.name) ? (
      <div
        ref={containerRef}
        className={`attribute-square ${squareColor} fade-in`}
      >
        {wordsArray.map((words, index) => (
          <span
            className="square-content"
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            style={{
              fontSize: `${fontSize[index]}px`,
              lineHeight: "16px",
            }}
          >
            {String(words).replaceAll("_", " ")}
          </span>
        ))}
      </div>
    ) : null;
  };

  return (
    <>
      {isImage(champion[pos])
        ? renderImage(champion[pos] as string)
        : renderAttributeSquare()}
    </>
  );
};

export default AttributeSquare;
