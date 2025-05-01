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
    const textColor = isCorrect ? "#00b42d" : "#ff3131";

    return (
      <>
        <span className={className}>
          <p>Your guess</p>
          <span
            style={{
              color: `${textColor}`,
              fontWeight: "600",
              fontSize: "1.2rem",
            }}
          >
            Set {choice}
          </span>
        </span>
        <span className="trait-bonus__text answer">
          <p>Answer</p>
          <span
            style={{ color: "#00b42d", fontWeight: "600", fontSize: "1.2rem" }}
          >
            Set {traitAnswer?.set}
          </span>
        </span>
      </>
    );
  };

  return (
    <div className="trait-bonus">
      <p>Bonus!</p>
      <span className="trait-bonus__header">Which set was this trait in?</span>
      {!choice && <SelectOptions options={sets} onSelect={handleSelect} />}
      {renderBonusText()}
    </div>
  );
};

export default TraitBonus;
