import React from "react";
import { Link } from "react-router-dom";

const Modes: React.FC = () => {
  return (
    <nav className="modes">
      <Link to="/">
        <button
          className="mode__button mode__button-classic"
          type="button"
          aria-label="classic mode button"
        >
          C
        </button>
      </Link>
      <Link to="/finisher">
        <button
          className="mode__button mode__button-finisher"
          type="button"
          aria-label="finsher mode button"
        >
          F
        </button>
      </Link>
      <button
        className="mode__button mode__button-xxxx"
        type="button"
        aria-label="xxxx mode button"
      >
        P
      </button>
      <button
        className="mode__button mode__button-xxxx"
        type="button"
        aria-label="xxxx mode button"
      >
        P
      </button>
    </nav>
  );
};

export default Modes;
