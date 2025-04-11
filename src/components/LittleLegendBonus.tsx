import React from "react";
import { LittleLegend } from "../type.ts";
import { useLittleLegendContext } from "../context/LittleLegendContext.tsx";

type LittleLegendBonusProps = {
  littleLegend: LittleLegend | undefined;
};

const LittleLegendBonus: React.FC<LittleLegendBonusProps> = ({
  littleLegend,
}) => {
  const { littleLegendList, littleLegendAnswer } = useLittleLegendContext();

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
          <button type="button" className="little-legend-bonus__btn">
            {variant.replaceAll("_", " ")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LittleLegendBonus;
