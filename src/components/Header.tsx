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
          <h1>TFTDLE</h1>
        </button>
      </Link>
    </div>
  );
};

export default Header;
