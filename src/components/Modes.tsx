import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBurst,
  faCheck,
  faMagnifyingGlass,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import ModeButtonHover from "./ModeButtonHover.tsx";
import { getFinishedModes } from "../utils/updateFinishedGameModes.ts";
import Tooltip from "./ToolTip.tsx";

const Modes: React.FC = () => {
  const [isCurrentPath, setIsCurrentPath] = useState<boolean>(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const finishedModes = getFinishedModes();

  return (
    <nav className="modes">
      <Link to="/classic">
        <Tooltip content="Classic" position="top">
          <button
            className="mode__button mode__button-classic"
            type="button"
            aria-label="classic mode button"
          >
            <img
              className="mode-button-base"
              src={`${currentPath === "/classic" || finishedModes.includes("/classic") ? "./images/tft_trait_gold.png" : "./images/tft_trait_black.png"}`}
              alt="button for navbar"
            />
            <FontAwesomeIcon className="mode-button-icon" icon={faQuestion} />
            {finishedModes.includes("/classic") && (
              <div className="mode-button-check-wrapper">
                <FontAwesomeIcon className="mode-button-check" icon={faCheck} />
                <div className="mode-button-check-background" />
              </div>
            )}
          </button>
        </Tooltip>
      </Link>
      <Link to="/finisher">
        <Tooltip content="Finisher" position="top">
          <button
            className="mode__button mode__button-finisher"
            type="button"
            aria-label="finsher mode button"
          >
            <img
              className="mode-button-base"
              src={`${currentPath === "/finisher" || finishedModes.includes("/finisher") ? "./images/tft_trait_gold.png" : "./images/tft_trait_black.png"}`}
              alt="button for navbar"
            />
            <FontAwesomeIcon className="mode-button-icon" icon={faBurst} />
            {finishedModes.includes("/finisher") && (
              <div className="mode-button-check-wrapper">
                <FontAwesomeIcon className="mode-button-check" icon={faCheck} />
                <div className="mode-button-check-background" />
              </div>
            )}
          </button>
        </Tooltip>
      </Link>
      <Link to="/littlelegend">
        <Tooltip content="Little Legend" position="top">
          <button
            className="mode__button mode__button-little-legend"
            type="button"
            aria-label="little legend mode button"
          >
            <img
              className="mode-button-base"
              src={`${currentPath === "/littlelegend" || finishedModes.includes("/littlelegend") ? "./images/tft_trait_gold.png" : "./images/tft_trait_black.png"}`}
              alt="button for navbar"
            />
            <FontAwesomeIcon
              className="mode-button-icon"
              icon={faMagnifyingGlass}
              size="1x"
            />
            {finishedModes.includes("/littlelegend") && (
              <div className="mode-button-check-wrapper">
                <FontAwesomeIcon className="mode-button-check" icon={faCheck} />
                <div className="mode-button-check-background" />
              </div>
            )}
          </button>
        </Tooltip>
      </Link>
      <Link to="/trait">
        <Tooltip content="Trait" position="top">
          <button
            className="mode__button mode__button-trait"
            type="button"
            aria-label="trait mode button"
          >
            <img
              className="mode-button-base"
              src={`${currentPath === "/trait" || finishedModes.includes("/trait") ? "./images/tft_trait_gold.png" : "./images/tft_trait_black.png"}`}
              alt="button for navbar"
            />
            <img
              src="./images/speech-bubble.svg"
              alt="Speech bubble"
              width={30}
              height={30}
              className="speech-bubble-button-icon"
            />
            {finishedModes.includes("/trait") && (
              <div className="mode-button-check-wrapper">
                <FontAwesomeIcon className="mode-button-check" icon={faCheck} />
                <div className="mode-button-check-background" />
              </div>
            )}
          </button>
        </Tooltip>
      </Link>
    </nav>
  );
};

export default Modes;
