import React, { useEffect } from "react";
import { LittleLegend } from "../type.ts";
import { useLittleLegendContext } from "../context/LittleLegendContext.tsx";
import BonusButton from "./BonusButton.tsx";

type LittleLegendBonusProps = {
  littleLegend: LittleLegend | undefined;
};

const LittleLegendBonus: React.FC<LittleLegendBonusProps> = ({
  littleLegend,
}) => {
  const { littleLegendList, littleLegendAnswer } = useLittleLegendContext();
  const [bonusAnswer, setBonusAnswer] = React.useState<string | undefined>("");
  const [choice, setChoice] = React.useState<string>("");
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

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
      littleLegend.name.replaceAll(`${littleLegend.baseType}_`, ""),
    );

  const getColor = (variant: string): string => {
    if (choice === bonusAnswer && variant === bonusAnswer) return "correct";
    if (choice === variant && variant !== bonusAnswer) return "incorrect";
    return "";
  };

  const renderBonusText = (): React.JSX.Element | null => {
    if (!choice) return null;

    const isCorrect = choice === bonusAnswer;
    const className = `little-legend-bonus__text ${isCorrect ? "right" : "wrong"}`;
    const message = isCorrect
      ? "✅ Correct! You guessed it right!"
      : "❌ Wrong! Maybe next time!";

    return (
      <>
        <span className={className}>{message}</span>
        <span className="little-legend-bonus__text">It was</span>
        <span className="little-legend-bonus__text answer">
          {littleLegendAnswer?.name
            .replaceAll(`${littleLegendAnswer.baseType}_`, "")
            .concat(" ", littleLegendAnswer.baseType)}
        </span>
      </>
    );
  };

  useEffect(() => {
    if (choice) {
      setIsDisabled(true);
    }
  }, [choice]);

  return (
    <div className="little-legend-bonus__container">
      <span className="little-legend-bonus__header">Bonus!</span>
      <span className="little-legend-bonus__question">
        Which variant is it?
      </span>
      <div className="little-legend-bonus__content">
        {littleLegendVariants.map((variant) => {
          return (
            <BonusButton
              color={getColor(variant)}
              variant={variant}
              key={variant}
              setChoice={setChoice}
              isDisabled={isDisabled}
            />
          );
        })}
      </div>
      {renderBonusText()}
    </div>
  );
};

export default LittleLegendBonus;
