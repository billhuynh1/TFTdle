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

const Modes: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const finishedModes = getFinishedModes();

  return (
    <nav className="modes">
      <Link to="/">
        <button
          className="mode__button mode__button-classic"
          type="button"
          aria-label="classic mode button"
        >
          <img
            className="mode-button-base"
            src={`${currentPath === "/" || finishedModes.includes("/") ? "./images/tft_trait_gold.png" : "./images/tft_trait_black.png"}`}
            alt="button for navbar"
          />
          {}
          <FontAwesomeIcon className="mode-button-icon" icon={faQuestion} />
          {finishedModes.includes("/") && (
            <div className="mode-button-check-wrapper">
              <FontAwesomeIcon className="mode-button-check" icon={faCheck} />
              <div className="mode-button-check-background" />
            </div>
          )}
          <ModeButtonHover mode="classic" />
        </button>
      </Link>
      <Link to="/finisher">
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
          <ModeButtonHover mode="finisher" />
        </button>
      </Link>
      <Link to="/littlelegend">
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
          <ModeButtonHover mode="little legend" />
        </button>
      </Link>
      <Link to="/trait">
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
          <ModeButtonHover mode="trait" />
        </button>
      </Link>
    </nav>
  );
};

export default Modes;
