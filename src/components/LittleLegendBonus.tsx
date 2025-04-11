import React, { useEffect } from "react";
import { LittleLegend } from "../type.ts";
import { useLittleLegendContext } from "../context/LittleLegendContext.tsx";

type LittleLegendBonusProps = {
  littleLegend: LittleLegend | undefined;
};

const LittleLegendBonus: React.FC<LittleLegendBonusProps> = ({
  littleLegend,
}) => {
  const { littleLegendList, littleLegendAnswer } = useLittleLegendContext();
  const [bonusAnswer, setBonusAnswer] = React.useState<string | undefined>("");
  const [choice, setChoice] = React.useState<string>("");

  useEffect(() => {
    if (littleLegendAnswer) {
      const variant: string | undefined = littleLegendAnswer.name.replaceAll(
        `${littleLegendAnswer.baseType}_`,
        "",
      );
      setBonusAnswer(variant);
    }
  }, [littleLegendAnswer]);

  // const handleClick = () => {
  //   setChoice()
  // };

  // Extracts the variants from the base type of the little legend
  const littleLegendVariants: string[] = littleLegendList
    .filter(
      (littleLegend) => littleLegend.baseType === littleLegendAnswer?.baseType,
    )
    .map((littleLegend) =>
      littleLegend.name.replaceAll(`${littleLegend.baseType}_`, ""),
    );

  return (
    <div className="little-legend-bonus__container">
      <h2 className="little-legend-bonus__header">Bonus!</h2>
      <span className="little-legend-bouns__question">
        Which variant is it?
      </span>
      <div className="little-legend-bonus__content">
        {littleLegendVariants.map((variant) => (
          <button
            type="button"
            className="little-legend-bonus__btn"
            onClick={() => setChoice(variant)}
            key={variant}
          >
            {variant
              .replaceAll("_", " ")
              .replace(littleLegend?.baseType ?? "", "Default")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LittleLegendBonus;
