import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface FooterProps {
  handleToggleAbout: () => void;
  handleToggleDiscordPopup: () => void;
}

const Footer: React.FC<FooterProps> = ({
  handleToggleAbout,
  handleToggleDiscordPopup,
}) => {
  return (
    <footer className="footer-container">
      <span
        style={{
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
          onClick={handleToggleDiscordPopup}
        >
          <FontAwesomeIcon
            icon={faDiscord}
            className="icon"
            size="3x"
            color="white"
            fixedWidth
          />
        </button>
        <a href="mailto:billhuynh012@gmail.com">
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
        </a>

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
