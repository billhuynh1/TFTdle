import Timer from "./Timer";

const LittleLegendInstructions = () => {
  const instructions =
    "Guess today's little legend from Riot's game Teamfight Tactics. It changes every 24 hours.";
  return (
    <>
      <span className="classic-instructions">{instructions}</span>
      <Timer />
      <h1 className="modal-title">Little Legend Mode</h1>
      <hr />
      <div className="modal-category">
        <span className="modal-info-text">
          In Little Legend Mode, try to guess which little legend it is based on
          the splash art in the least number of attempts. The zoom area is
          random and it changes daily.
        </span>
      </div>
    </>
  );
};

export default LittleLegendInstructions;
