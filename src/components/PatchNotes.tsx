import patches from "../data/patches.ts";
import { PatchNote } from "../type.ts";

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
