import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useTraitContext } from "../context/TraitContext.tsx";
import AtlasIcon from "./AtlasIcon.tsx";

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
          <AtlasIcon
            col={6}
            row={0}
            size={64}
            atlasSize={512}
            iconSize={49}
            imageUrl="images/tft_traits_texture_atlas.png"
          />
        </span>
      ) : (
        <span className="trait-hint-helper__text trait-hint-helper__text--visible">
          Trait includes these champions:
          <div className="trait-hint-helper__icon-wrapper">
            <div className="trait-hint-helper__icon">
              <AtlasIcon
                col={6}
                row={0.09}
                size={64}
                atlasSize={512}
                iconSize={49.3}
                imageUrl="images/tft_traits_texture_atlas.png"
              />
            </div>
            <div className="trait-hint-helper__tooltip">{champsFromTrait}</div>
          </div>
        </span>
      )}
    </div>
  );
};

export default TraitHintHelper;
