import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faImage,
  faEllipsis,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import ModeButtonHover from "./ModeButtonHover.tsx";

const Modes: React.FC = () => {
  return (
    <nav className="modes">
      <Link to="/">
        <button
          className="mode__button mode__button-classic"
          type="button"
          aria-label="classic mode button"
        >
          <FontAwesomeIcon icon={faUser} />
          <ModeButtonHover mode="classic" />
        </button>
      </Link>
      <Link to="/finisher">
        <button
          className="mode__button mode__button-finisher"
          type="button"
          aria-label="finsher mode button"
        >
          <FontAwesomeIcon icon={faImage} />
          <ModeButtonHover mode="finisher" />
        </button>
      </Link>
      <Link to="/littlelegend">
        <button
          className="mode__button mode__button-little-legend"
          type="button"
          aria-label="little legend mode button"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <ModeButtonHover mode="little legend" />
        </button>
      </Link>
      <Link to="/trait">
        <button
          className="mode__button mode__button-trait"
          type="button"
          aria-label="trait mode button"
        >
          <FontAwesomeIcon icon={faEllipsis} />
          <ModeButtonHover mode="trait" />
        </button>
      </Link>
    </nav>
  );
};

export default Modes;
