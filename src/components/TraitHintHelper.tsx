import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useTraitContext } from "../context/TraitContext.tsx";

type TraitHintHelperProps = {
  attempts: number;
};

const TraitHintHelper = ({
  attempts,
}: TraitHintHelperProps): React.ReactElement => {
  const { traitAnswer } = useTraitContext();
  const attemptsLeftForHints = 7 - attempts;

  const capitalizeWords = (input: string | undefined): string[] => {
    if (!input) return [];

    return input
      .split(",") // Split by comma
      .map((champ) => champ.trim()) // Trim whitespace
      .map((champ) => champ.charAt(0).toUpperCase() + champ.slice(1)); // Capitalize
  };

  const champsFromTrait = capitalizeWords(traitAnswer?.champs).join(", ");

  return (
    <div className="trait-hint-helper">
      {attemptsLeftForHints > 0 ? (
        <span className="trait-hint-helper__text trait-hint-helper__text--hidden">
          Hint: Champions in {attemptsLeftForHints} attempts
          <FontAwesomeIcon
            icon={faCircleUser}
            size="3x"
            style={{ marginTop: "10px" }}
          />
        </span>
      ) : (
        <span className="trait-hint-helper__text trait-hint-helper__text--visible">
          Trait includes these champions:
          <div className="trait-hint-helper__icon">
            <FontAwesomeIcon icon={faCircleUser} size="3x" />
            <div className="trait-hint-helper__tooltip">{champsFromTrait}</div>
          </div>
        </span>
      )}
    </div>
  );
};

export default TraitHintHelper;
