/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */

const GameHeader = () => {
  return (
    <div className="game-header">
      <span
        style={{
          padding: "20px",
          fontWeight: "bold",
          color: "#e4e6ed",
          textShadow: "black 1px 0 10px",
        }}
      >
        Guess today's TFT Champion!
      </span>
      <span
        style={{
          padding: "5px",
          paddingBottom: "25px",
          color: "#979797",
          textShadow: "black 1px 0 10px",
        }}
      >
        Type any character to start.
      </span>
    </div>
  );
};

export default GameHeader;
