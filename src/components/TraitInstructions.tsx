import Timer from "./Timer";

const TraitInstructions = () => {
  const instructions =
    "Guess today's trait from Riot's game Teamfight Tactics. It changes every 24 hours.";
  return (
    <>
      <span className="classic-instructions">{instructions}</span>
      <Timer />
      <h1 className="modal-title">Trait Mode</h1>
      <hr />
      <div className="modal-category">
        <span className="modal-info-text">
          In Trait Mode, try to guess trait based on the description given.
          After 7 guesses, champions from that trait are revealed.
        </span>
      </div>
    </>
  );
};

export default TraitInstructions;
