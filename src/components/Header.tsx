import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div className="header">
      <Link to="/">
        <button
          className="header-button-home"
          type="button"
          aria-label="header home button"
        >
          <img src="./images/tftdle_logo.svg" alt="TFTdle logo" />
        </button>
      </Link>
    </div>
  );
};

export default Header;
