import React from "react";
import { Link } from "react-router-dom";

const Home = (): React.ReactElement => {
  return (
    <div className="home-container">
      <span className="home-page-header">
        Guess Teamfight Tactics characters
      </span>
      <Link to="/classic">
        <button
          className="next-mode-button home-button"
          type="button"
          aria-label="classic mode button"
        >
          <img
            src="./images/classic_button.png"
            className="next-mode-button-icon home-button"
            alt="Next mode button"
          />
          <span className="next-mode-button-text">Classic</span>
          <span className="next-mode-button__description">
            Every guess comes with a hint
          </span>
        </button>
      </Link>
      <Link to="/finisher">
        <button
          className="next-mode-button home-button"
          type="button"
          aria-label="finsher mode button"
        >
          <img
            src="./images/finisher_button.png"
            className="next-mode-button-icon home-button"
            alt="Next mode button"
          />
          <span className="next-mode-button-text">Finisher</span>
          <span className="next-mode-button__description">
            Their last move, your best guess
          </span>
        </button>
      </Link>
      <Link to="/littlelegend">
        <button
          className="next-mode-button home-button"
          type="button"
          aria-label="finsher mode button"
        >
          <img
            src="./images/littlelegend_button.png"
            className="next-mode-button-icon home-button"
            alt="Next mode button"
          />
          <span className="next-mode-button-text">Little Legend</span>
          <span className="next-mode-button__description">
            Guess the little legend splash art
          </span>
        </button>
      </Link>
      <Link to="/trait">
        <button
          className="next-mode-button home-button"
          type="button"
          aria-label="next game mode button"
        >
          <img
            src="./images/trait_button.png"
            className="next-mode-button-icon home-button"
            alt="Next mode button"
          />
          <span className="next-mode-button-text">Trait</span>
          <span className="next-mode-button__description">
            Read the description, guess it
          </span>
        </button>
      </Link>
    </div>
  );
};

export default Home;
