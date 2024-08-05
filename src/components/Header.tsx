import React from "react";

const Header: React.FC = () => {
    return (
        <div className="header">
            <span style={{ fontWeight: "bold", textShadow: "2px 2px 20px #000000", marginLeft: "126px", justifyContent: "center", alignItems: "center" }}>
                TFTDLE
            </span>
            <img
                src="images/tftdle_pengu.png"
                className="header-image"
                alt="Header penguin"
            />
        </div>
    );
};


export default Header;