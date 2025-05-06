import Timer from "./Timer.tsx";

const ClassicInstructions = () => {
  const instructions =
    "Guess today's champion from Riot's game Teamfight Tactics. It changes every 24 hours.";
  const classicInstructions = `In classic mode, simply type in the name of a champion and it will show attributes. 
  The color of the tiles will change to show how close your guess was to the champion to find. 
  Green 🟩 indicates the property is an exact match. 
  Orange 🟧 indicates partial match. Red 🟥 indicates there is nooverlap between your guess and the property.`;

  return (
    <>
      <span className="classic-instructions">{instructions}</span>
      <Timer />
      <hr className="timer-separator" />
      <span className="classic-instructions">
        {classicInstructions.split(". ").map((sentence) => (
          <p>{sentence.trim() + (sentence.endsWith(".") ? "" : ".")}</p>
        ))}
      </span>
      <h1 className="modal-title">Properties</h1>
      <hr />
      <div className="modal-category">
        <span className="modal-sub-title">Gender</span>
        <div className="modal-info">
          <span className="modal-info-highlight">Possible values: </span>
          <span className="modal-info-text">Male, Female, and Other</span>
        </div>
      </div>
      <div className="modal-category">
        <span className="modal-sub-title">Cost</span>
        <span>The cost of the champion.</span>
        <div className="modal-info">
          <span className="modal-info-highlight">Possible values: </span>
          <span className="modal-info-text">
            1, 2, 3, 4, 5, and sometimes 6
          </span>
        </div>
      </div>
      <div className="modal-category">
        <span className="modal-sub-title">Type</span>
        <span>
          The champion role. This is determined by how common the champion
          is/was played. There could be multiple types for one champion
        </span>
        <div className="modal-info">
          <span className="modal-info-highlight">Possible values: </span>
          <span className="modal-info-text">
            Magic Carry, Attack Carry, Bruiser, Tank, etc...
          </span>
        </div>
      </div>
      <div className="modal-category">
        <span className="modal-sub-title">Traits</span>
        <span>
          There could be multiple traits for one champion, unique traits are
          included.
        </span>
        <div className="modal-info">
          <span className="modal-info-highlight">Possible values: </span>
          <span className="modal-info-text">
            Bard, Bruiser, Cybernetic, etc....
          </span>
        </div>
      </div>
      <div className="modal-category">
        <span className="modal-sub-title">Attack Range</span>
        <span>
          The range of the champion in game. Some champions have multiple attack
          ranges.
        </span>
        <div className="modal-info">
          <span className="modal-info-highlight">Possible values: </span>
          <span className="modal-info-text">1, 2, 3, 4</span>
        </div>
        <span style={{ marginTop: "20px" }}>GL HF</span>
      </div>
    </>
  );
};

export default ClassicInstructions;
