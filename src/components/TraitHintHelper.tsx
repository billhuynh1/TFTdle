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

  // Add an icon for the hint helper
  return (
    <div className="trait-hint-helper">
      {attemptsLeftForHints > 0 ? (
        <span className="trait-hint-helper__text trait-hint-helper__text--hidden">
          Hint: Champions in {attemptsLeftForHints} attempts
        </span>
      ) : (
        <span className="trait-hint-helper__text trait-hint-helper__text--visible">
          Trait includes these champions:
          <div className="trait-hint-helper__icon">
            <FontAwesomeIcon icon={faCircleUser} size="2x" />
            <div className="trait-hint-helper__tooltip">
              {traitAnswer?.champs}, hellom, hello again, hello, hello
            </div>
          </div>
        </span>
      )}
    </div>
  );
};

export default TraitHintHelper;
