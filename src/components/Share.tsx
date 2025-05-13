import React, { ReactElement } from "react";
import { useChampionContext } from "../context/ChampionContext";
import checkPartialGuess from "../utils/checkPartialGuess";
import { Champion } from "../type";
import ShareButton from "./ShareButton";

type ShareProps = {
  mode: string;
};

const Share = ({ mode }: ShareProps): ReactElement => {
  const { guessedChampions, testChampion } = useChampionContext();
  const attempts = JSON.parse(localStorage.getItem(`${mode}_guesses`) || "");
  const launchDate = new Date("2025-05-08"); // use ISO format to avoid timezone issues
  const today = new Date();

  // Clear time portion for both to get full days only
  launchDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const msInDay = 1000 * 60 * 60 * 24;
  const dayNumber =
    Math.floor((today.getTime() - launchDate.getTime()) / msInDay) + 1;

  const colorToEmoji = {
    correct: "🟩",
    partial: "🟧",
    incorrect: "🟥",
  };

  const isImage = (url: string | number) => {
    if (typeof url !== "string") {
      return false;
    }
    const regex = /\.(jpg|jpeg|png|gif|bmp|svg)$/;
    return regex.test(url);
  };

  const generateShareGrid = (
    guesses: Champion[],
    testChampion: Champion | null,
  ): string => {
    return guesses
      .map((guess) => {
        return (Object.keys(guess) as (keyof Champion)[])
          .map((key) => {
            const guessValue = guess[key];
            const answerValue = testChampion?.[key];

            if (isImage(guessValue) || key === "name") {
              return "";
            }
            if (guessValue === answerValue) return colorToEmoji.correct;
            if (
              checkPartialGuess(
                String(guessValue ?? ""),
                String(answerValue ?? ""),
              )
            )
              return colorToEmoji.partial;
            return colorToEmoji.incorrect;
          })
          .join("");
      })
      .join("\n");
  };

  const shareGrid: string = generateShareGrid(guessedChampions, testChampion);

  const shareText = `I found #TFTdle character #${dayNumber} in ${mode} mode in ${attempts.length} tries 🐧${
    mode === "classic" ? `\n\n${shareGrid}` : ""
  }\nhttps://tft-dle.com`;

  return (
    <div className="share-container">
      <span className="share">
        I found #TFTdle character #{dayNumber} in {mode} mode in{" "}
        {attempts.length} tries 🐧
      </span>
      {mode === "classic" && <div className="emoji-grid">{shareGrid}</div>}
      <span className="share">https://tft-dle.com</span>
      <ShareButton content={shareText} />
    </div>
  );
};

export default Share;
