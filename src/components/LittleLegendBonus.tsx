import React, { useEffect } from "react";
import { LittleLegend } from "../type.ts";
import { useLittleLegendContext } from "../context/LittleLegendContext.tsx";
import SelectOptions from "./SelectOptions.tsx";

type LittleLegendBonusProps = {
  littleLegend: LittleLegend | undefined;
};

const LittleLegendBonus: React.FC<LittleLegendBonusProps> = ({
  littleLegend,
}) => {
  const { littleLegendList, littleLegendAnswer } = useLittleLegendContext();
  const [bonusAnswer, setBonusAnswer] = React.useState<string | undefined>("");
  const [choice, setChoice] = React.useState<string>(() => {
    return localStorage.getItem("littleLegendBonusAnswer") || "";
  });
  const [isCorrect, setIsCorrect] = React.useState<boolean>(false);

  useEffect(() => {
    if (littleLegendAnswer) {
      const variant: string | undefined = littleLegendAnswer.name.replaceAll(
        `${littleLegendAnswer.baseType}_`,
        "",
      );
      setBonusAnswer(variant);
    }
  }, [littleLegendAnswer]);

  // Extracts the variants from the base type of the little legend
  const littleLegendVariants: string[] = littleLegendList
    .filter(
      (littleLegend) => littleLegend.baseType === littleLegendAnswer?.baseType,
    )
    .map((littleLegend) =>
      littleLegend.name
        .replaceAll(`${littleLegend.baseType}_`, "")
        .replaceAll("_", " "),
    );

  const renderBonusText = (): React.JSX.Element | null => {
    if (!choice) return null;

    const isCorrect: boolean =
      choice.replaceAll("_", " ") === bonusAnswer?.replaceAll("_", " ");
    const className: string = `little-legend-bonus__text ${isCorrect ? "right" : "wrong"}`;
    const textColor = isCorrect ? "#00b42d" : "#ff3131";
    return (
      <>
        <span className={className}>
          <p>Your Guess</p>
          <span style={{ color: `${textColor}` }}>{choice}</span>
        </span>
        {isCorrect ? (
          <span
            className="little-legend-bonus__text right wobble"
            style={{ margin: "10px" }}
          >
            Good job!
          </span>
        ) : (
          <span className="little-legend-bonus__text answer">
            <p>Answer</p>
            <span
              style={{
                color: "#00b42d",
                fontWeight: "600",
                fontSize: "1.2rem",
              }}
            >
              {" "}
              {littleLegendAnswer?.name
                .replaceAll(`${littleLegendAnswer.baseType}`, "")
                .replaceAll("_", " ")}
            </span>
          </span>
        )}
      </>
    );
  };

  const handleSelect = (selectedOption: string) => {
    setChoice(selectedOption);
    localStorage.setItem("littleLegendBonusAnswer", selectedOption);
  };

  useEffect(() => {
    if (choice === bonusAnswer) {
      setIsCorrect(true);
    }
  }, [choice]);

  return (
    <div className="little-legend-bonus__container">
      <span className="little-legend-bonus__header">Bonus!</span>
      <span className="little-legend-bonus__question">
        Which variant is it?
      </span>
      {!choice && (
        <SelectOptions options={littleLegendVariants} onSelect={handleSelect} />
      )}
      {renderBonusText()}
    </div>
  );
};

export default LittleLegendBonus;
