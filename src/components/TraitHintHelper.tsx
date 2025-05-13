import React, { useEffect, useState } from "react";
import { useTraitContext } from "../context/TraitContext";
import Tooltip from "./ToolTip";

type TraitHintHelperProps = {
  attempts: number;
};

const TraitHintHelper = ({
  attempts,
}: TraitHintHelperProps): React.ReactElement => {
  const { traitAnswer } = useTraitContext();
  const [animate, setAnimate] = useState(false);

  const attemptsLeftForHints = 7 - attempts;

  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 600); // Match animation length
    return () => clearTimeout(timeout);
  }, [attempts]);

  // const capitalizeWords = (input: string | undefined): string[] => {
  //   if (!input) return [];

  //   return input
  //     .split(",") // Split by comma
  //     .map((champ) => champ.trim()) // Trim whitespace
  //     .map((champ) => champ.charAt(0).toUpperCase() + champ.slice(1)); // Capitalize
  // };

  // const champsFromTrait = capitalizeWords(traitAnswer?.champs).join(", ");

  return (
    <div className="trait-hint-helper">
      {attemptsLeftForHints > 0 ? (
        <div className="trait-hint-helper__text-wrapper">
          <span
            className={`trait-hint-helper__text trait-hint-helper__text--hidden ${animate ? "wobble" : ""}`}
          >
            Hint: Champions in {attemptsLeftForHints} attempts
          </span>
          <Tooltip content="Champions in this trait.">
            <div className="icon-hover-wrapper">
              <img
                src="images/champion_icon.png"
                alt="champ helmet"
                className="champ-trait-icon"
                width={40}
                height={40}
              />
            </div>
          </Tooltip>
        </div>
      ) : (
        <span className="trait-hint-helper__text trait-hint-helper__text--visible">
          Champions:
          <div className="trait-hint-helper__icon-wrapper">
            <div className="trait-hint-helper__icon">
              <img
                src="images/champion_icon.png"
                alt="champ helmet"
                className="champ-trait-icon"
                width={40}
                height={40}
              />
            </div>
            <div className="trait-hint-helper__tooltip">
              {traitAnswer?.champs}
            </div>
          </div>
        </span>
      )}
    </div>
  );
};

export default TraitHintHelper;
