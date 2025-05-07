import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import Modes from "./Modes.tsx";
import DiscordPopup from "./DiscordPopup.tsx";
import About from "./About.tsx";
import usePageTracking from "../hooks/usePageTracking.tsx";
import Headers from "./Headers.tsx";

const Layout: React.FC = () => {
  const [renderAbout, setrenderAbout] = useState<boolean>(false);
  const [renderDiscordPopup, setrenderDiscordPopup] = useState<boolean>(false);
  const year = new Date().getFullYear();

  const handleToggleAbout = () => {
    setrenderAbout((renderAbout) => !renderAbout);
  };

  const handleToggleDiscordPopup = () => {
    setrenderDiscordPopup((renderDiscordPopup) => !renderDiscordPopup);
  };

  usePageTracking();

  return (
    <div className="App">
      <div className="background-container">
        <Header />
        <main className="container">
          <Outlet />
          <Footer
            handleToggleAbout={handleToggleAbout}
            handleToggleDiscordPopup={handleToggleDiscordPopup}
          />
          <span className="website">tft-dle.com - {year}</span>
          {renderAbout && <About handleToggleAbout={handleToggleAbout} />}
          {renderDiscordPopup && <DiscordPopup />}
        </main>
      </div>
    </div>
  );
};

export default Layout;
