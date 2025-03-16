import React from "react";
import { Link } from "react-router-dom";

const Modes: React.FC = () => {
  return (
    <nav className="modes">
      <Link to="/">
        <button
          className="classic-mode__button"
          type="button"
          aria-label="classic mode button"
        >
          CLASSIC
        </button>
      </Link>
      <Link to="/finisher">
        <button
          className="finisher-mode__button"
          type="button"
          aria-label="finsher mode button"
        >
          FINISHER
        </button>
      </Link>
      <button
        className="xxxx-mode__button"
        type="button"
        aria-label="xxxx mode button"
      >
        PLACEHOLDER
      </button>
      <button
        className="xxxx-mode__button"
        type="button"
        aria-label="xxxx mode button"
      >
        PLACEHOLDER
      </button>
    </nav>
  );
};

export default Modes;
