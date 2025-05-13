import React from "react";
import { useLittleLegendContext } from "../context/LittleLegendContext";

type BonusButtonProps = {
  color: string;
  variant: string;
  setChoice: React.Dispatch<React.SetStateAction<string>>;
  isDisabled?: boolean;
};

const BonusButton = ({
  color,
  variant,
  setChoice,
  isDisabled,
}: BonusButtonProps) => {
  const { littleLegendAnswer } = useLittleLegendContext();
  return (
    <button
      type="button"
      key={variant}
      aria-label="bonus button"
      className={`little-legend-bonus__btn ${color}`}
      onClick={() => {
        setChoice(variant);
        localStorage.setItem("littleLegendBonusAnswer", variant);
      }}
      disabled={isDisabled}
    >
      {" "}
      {variant
        .replaceAll("_", " ")
        .replace(littleLegendAnswer?.baseType ?? "", "Default")}
    </button>
  );
};

export default BonusButton;
