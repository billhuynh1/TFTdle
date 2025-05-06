import Timer from "./Timer.tsx";

const FinisherInstructions = () => {
  const instructions =
    "Guess today's champion from Riot's game Teamfight Tactics. It changes every 24 hours.";
  return (
    <>
      <span className="classic-instructions">{instructions}</span>
      <Timer />
      <h1 className="modal-title">Finisher Mode</h1>
      <hr />
      <div className="modal-category">
        <span className="modal-info-text">
          In Finisher Mode, try to guess the Chibi is based on the blurred out
          finisher. You can see the finisher once you guessed it correctly.
        </span>
      </div>
    </>
  );
};

export default FinisherInstructions;
