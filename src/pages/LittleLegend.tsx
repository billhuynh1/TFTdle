import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LittleLegendHeader from "../components/LittleLegendHeader.tsx";
import SearchBars from "../components/SearchBars.tsx";
import { useLittleLegendContext } from "../context/LittleLegendContext.tsx";
import { LittleLegend } from "../type.ts";
import AnswersItem from "../components/AnswersItem.tsx";

const LittleLegendPage: React.FC = () => {
  const {
    littleLegendList,
    guessedLittleLegends,
    setGuessedLittleLegends,
    littleLegendAnswer,
  } = useLittleLegendContext();
  const [attempts, setAttempts] = React.useState<number>(0);
  const location = useLocation();
  const mode = location.pathname.replace("/", "");

  // Util function
  const findLittleLegendByNameInTable = (
    littleLegends: string[],
    littleLegendBaseList: LittleLegend[],
  ): LittleLegend[] => {
    const littleLegendObjects = littleLegends.map(
      (name) =>
        littleLegendBaseList.find(
          (littleLegend) => littleLegend.name === name,
        )!,
    );
    return littleLegendObjects.reverse();
  };

  const littleLegendBaseList: LittleLegend[] = littleLegendList.filter(
    (littleLegend) => littleLegend.baseType === littleLegend.name,
  );

  const fetchGuesses = (): string => {
    const guesses: string = localStorage.getItem(`${mode}_guesses`) || "";
    return guesses;
  };

  useEffect(() => {
    if (!littleLegendAnswer) return;
    const guessesFromStorage: string[] = JSON.parse(fetchGuesses()) || [];
    const updateGuesses = (littleLegends: string[]) => {
      const guesses = findLittleLegendByNameInTable(
        littleLegends,
        littleLegendBaseList,
      );
      setGuessedLittleLegends(guesses);
    };
    updateGuesses(guessesFromStorage);
  }, [littleLegendAnswer, littleLegendList]);

  return (
    <>
      <LittleLegendHeader />
      <SearchBars
        items={littleLegendBaseList}
        guessedItems={guessedLittleLegends}
        setGuessedItems={setGuessedLittleLegends}
        setAttempts={setAttempts}
        pathForImages="little_legends"
      />
      <div className="answers__container">
        {guessedLittleLegends.map((littleLegend) => {
          const itemColor =
            littleLegend.baseType === littleLegendAnswer?.baseType
              ? "correct"
              : "incorrect";

          return (
            <AnswersItem
              key={littleLegend.id}
              item={littleLegend}
              pathOfImages="little_legends"
              itemColor={itemColor}
            />
          );
        })}
      </div>
    </>
  );
};

export default LittleLegendPage;
