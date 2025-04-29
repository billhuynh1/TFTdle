import React, { useEffect, useState } from "react";
import { useTraitContext } from "../context/TraitContext.tsx";
import SelectOptions from "./SelectOptions.tsx";

const TraitBonus = () => {
  const { traitAnswer } = useTraitContext();
  const [choice, setChoice] = useState<number | null>(() => {
    const stored = localStorage.getItem("traitBonusAnswer");
    return stored !== null ? parseInt(stored, 10) : null;
  });

  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const sets: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  const handleSelect = (selectedOption: number) => {
    setChoice(selectedOption);
    localStorage.setItem("traitBonusAnswer", JSON.stringify(selectedOption));
  };

  useEffect(() => {
    if (choice === 0) return;
    setIsCorrect(choice === traitAnswer?.set);
  }, [choice, traitAnswer]);

  const renderBonusText = (): React.JSX.Element | null => {
    if (!choice) return null;

    const isCorrect: boolean = choice === traitAnswer?.set;
    const className: string = `trait-bonus__text ${isCorrect ? "right" : "wrong"}`;
    const message: string = isCorrect ? "✅ Correct!" : "❌ Wrong!";

    // If answer is incorrect, render "Wrong! You guessed {choice}"

    return (
      <>
        <span className={className}>{message}</span>
        <span className="trait-bonus__text answer">
          It was{" "}
          <span
            style={{ color: "green", fontWeight: "600", fontSize: "1.3em" }}
          >
            Set {traitAnswer?.set}
          </span>
        </span>
      </>
    );
  };

  return (
    <div className="trait-bonus">
      <span className="trait-bonus__header">Which set was this trait in?</span>
      {!choice && <SelectOptions options={sets} onSelect={handleSelect} />}
      {renderBonusText()}
    </div>
  );
};

export default TraitBonus;
