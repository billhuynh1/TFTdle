import React, { useEffect, useState } from "react";
import { Champion } from "../type.ts";
import { useChampionContext } from "../App.tsx";
import checkPartialGuess from "../utils/checkPartialGuess.ts";

interface AttributeSquareProps {
  pos: keyof Champion;
  champion: Champion;
}

const AttributeSquare: React.FC<AttributeSquareProps> = ({ pos, champion }) => {
  const [squareColor, setSquareColor] = useState<string>("");
  const [imagePath, setImagePath] = useState<string | undefined>(
    process.env.REACT_APP_AWS_S3_URL,
  );
  const testChampion = useChampionContext();

  // Refactor the logic
  useEffect(() => {
    if (!testChampion || !champion) return;

    if (champion[pos] === testChampion[pos]) {
      setSquareColor("correct");
    } else if (
      checkPartialGuess(
        String(champion?.[pos] ?? ""),
        String(testChampion?.[pos] ?? ""),
      )
    ) {
      setSquareColor("partial");
    } else if (
      typeof testChampion[pos] === "number" &&
      typeof champion[pos] === "number" &&
      testChampion[pos] > champion[pos]
    ) {
      setSquareColor("incorrect up");
    } else if (
      typeof testChampion[pos] === "number" &&
      typeof champion[pos] === "number" &&
      testChampion[pos] < champion[pos]
    ) {
      setSquareColor("incorrect down");
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

  return (
    <>
      {isImage(champion[pos]) ? (
        <img
          className="champion-image"
          src={`${imagePath}${champion.imageurl}`}
          alt="Champion"
        />
      ) : (
        <div className={`attribute-square ${squareColor}`}>
          <div className="square-content">
            {typeof champion[pos] === "string"
              ? champion[pos].replaceAll("_", " ")
              : champion[pos]}
          </div>
        </div>
      )}
    </>
  );
};

export default AttributeSquare;
