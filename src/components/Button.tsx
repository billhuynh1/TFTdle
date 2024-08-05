import React from "react";

type ButtonProps = {
    icon: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ icon, onClick }) => {

    return (
        <>
            <button
                className="button"
                onClick={onClick}
            >
                <img
                    src={icon}
                    className="button-img"
                    alt=""
                />
            </button>
        </>
    )
}

export default Button;