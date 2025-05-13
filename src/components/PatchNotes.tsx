import patches from "../data/patches";
import { PatchNote } from "../type";

const PatchNotes = () => {
  const patchNotes: PatchNote[] = patches;
  return (
    <>
      {patchNotes.map((patch) => (
        <div className="notes">
          <span className="notes-date">{patch.date}</span>
          {patch.changes.map((change) => (
            <span className="notes-text">{change}</span>
          ))}
        </div>
      ))}
    </>
  );
};

export default PatchNotes;
