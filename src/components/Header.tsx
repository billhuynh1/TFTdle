import React from "react";

const Header: React.FC = () => {
  return (
    <div className="header">
      <img src="images/tft_logo.png" className="header__logo" alt="TFT logo" />
      <h1
        style={{
          fontWeight: "bold",
        }}
      >
        TFTDLE
      </h1>
    </div>
  );
};

export default Header;
