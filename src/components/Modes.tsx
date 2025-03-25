import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faImage, faEllipsis } from "@fortawesome/free-solid-svg-icons";
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
      <button
        className="mode__button mode__button-xxxx"
        type="button"
        aria-label="xxxx mode button"
      >
        <FontAwesomeIcon icon={faEllipsis} />
        <ModeButtonHover mode="coming soon..." />
      </button>
      <button
        className="mode__button mode__button-xxxx"
        type="button"
        aria-label="xxxx mode button"
      >
        <FontAwesomeIcon icon={faEllipsis} />
        <ModeButtonHover mode="coming soon..." />
      </button>
    </nav>
  );
};

export default Modes;
