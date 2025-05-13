import React, { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import DiscordPopup from "./DiscordPopup";
import About from "./About";
import usePageTracking from "../hooks/usePageTracking";

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
      <Analytics />
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
