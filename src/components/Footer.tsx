import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface FooterProps {
  handleToggleAbout: () => void;
}

const Footer: React.FC<FooterProps> = ({ handleToggleAbout }) => {
  return (
    <footer className="footer-container">
      <span
        style={{
          paddingTop: "30px",
          fontWeight: "bold",
          color: "#e4e6ed",
          textShadow: "black 1px 0 10px",
        }}
      >
        Contact and About
      </span>
      <div className="fa-icon-container">
        <button
          type="button"
          aria-label="Contact on Discord"
          className="icon-button"
        >
          <FontAwesomeIcon
            icon={faDiscord}
            className="icon"
            size="3x"
            color="white"
            fixedWidth
          />
        </button>
        <button
          type="button"
          aria-label="Contact via Google"
          className="icon-button"
        >
          <FontAwesomeIcon
            icon={faGoogle}
            className="icon"
            size="3x"
            color="white"
            fixedWidth
          />
        </button>
        <button
          type="button"
          aria-label="More Info"
          className="icon-button"
          onClick={handleToggleAbout}
        >
          <FontAwesomeIcon
            icon={faCircleInfo}
            className="icon"
            size="3x"
            color="white"
          />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
