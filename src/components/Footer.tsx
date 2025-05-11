import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faGoogle,
  faReddit,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Modal from "./Modal.tsx";
import About from "./About.tsx";
import Tooltip from "./ToolTip.tsx";

interface FooterProps {
  handleToggleAbout: () => void;
  handleToggleDiscordPopup: () => void;
}

const Footer: React.FC<FooterProps> = ({
  handleToggleAbout,
  handleToggleDiscordPopup,
}) => {
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const openAbout = () => setIsAboutOpen(true);
  const closeAbout = () => setIsAboutOpen(false);
  return (
    <>
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
          <Tooltip content="Tiktok">
            <a href="https://www.tiktok.com/@billhuynh791?is_from_webapp=1&sender_device=pc">
              <button
                type="button"
                className="icon-button"
                aria-label="Contact via tiktok"
              >
                <FontAwesomeIcon
                  icon={faTiktok}
                  className="icon"
                  size="3x"
                  color="white"
                />
              </button>
            </a>
          </Tooltip>
          <Tooltip content="Reddit">
            <a href="https://www.reddit.com/user/Signal-Analyst-9052/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button">
              <button
                type="button"
                className="icon-button"
                aria-label="Contact via tiktok"
              >
                <FontAwesomeIcon
                  icon={faReddit}
                  className="icon"
                  size="3x"
                  color="white"
                />
              </button>
            </a>
          </Tooltip>
          <a href="mailto:tftdle01@gmail.com">
            <Tooltip content="gmail">
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
            </Tooltip>
          </a>
          <Tooltip content="About">
            <button
              type="button"
              aria-label="More Info"
              className="icon-button"
              onClick={openAbout}
            >
              <FontAwesomeIcon
                icon={faCircleInfo}
                className="icon"
                size="3x"
                color="white"
              />
            </button>
          </Tooltip>
        </div>
      </footer>
      <Modal isOpen={isAboutOpen} onClose={closeAbout} title="About">
        <About />
      </Modal>
    </>
  );
};

export default Footer;
