import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Streak from "./Streak";
import PatchNotes from "./PatchNotes";
import Modal from "./Modal";
import ToolTip from "./ToolTip";
import ClassicInstructions from "./ClassicInstructions";
import FinisherInstructions from "./FinisherInstructions";
import LittleLegendInstructions from "./LittleLegendInstructions";
import TraitInstructions from "./TraitInstructions";

const Headers = () => {
  // Make StreakCounter component, PatchNotes component, and HowToPlay component
  const [isPatchNotesOpen, setIsPatchNotesOpen] = useState<boolean>(false);
  const [isInstructionsOpen, setIsInstructionOpen] = useState<boolean>(false);
  const location = useLocation();

  const openPatchNotes = () => setIsPatchNotesOpen(true);
  const closePatchNotes = () => setIsPatchNotesOpen(false);
  const openInstructions = () => setIsInstructionOpen(true);
  const closeInstructions = () => setIsInstructionOpen(false);

  // Switch case for instructions based on which game mode they are in.
  const getInstructionsForPage = (pathname: string) => {
    switch (pathname) {
      case "/classic":
        return <ClassicInstructions />;
      case "/finisher":
        return <FinisherInstructions />;
      case "/littlelegend":
        return <LittleLegendInstructions />;
      case "/trait":
        return <TraitInstructions />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="headers">
        <ToolTip content="Current Streak (daily conesecutive wins)">
          <Streak />
        </ToolTip>
        <ToolTip content="Patch Notes">
          <button
            className="patch-notes-button"
            type="button"
            aria-label="Open Patch Notes"
            onClick={openPatchNotes}
          >
            <img
              src="./images/patch_notes.svg"
              alt="Patch notes icon"
              className="patch-notes-icon"
            />
          </button>
        </ToolTip>
        <ToolTip content="How to play">
          <button
            className="how-to-play-button"
            type="button"
            aria-label="Open instructions"
            onClick={openInstructions}
          >
            <img
              src="./images/question-mark-circled.svg"
              alt="circled question mark"
              className="how-to-play-icon"
            />
          </button>
        </ToolTip>
      </div>
      <Modal
        isOpen={isPatchNotesOpen}
        onClose={closePatchNotes}
        title="Patch Notes"
      >
        <PatchNotes />
      </Modal>
      <Modal
        isOpen={isInstructionsOpen}
        onClose={closeInstructions}
        title="How to play"
      >
        {getInstructionsForPage(location.pathname)}
      </Modal>
    </>
  );
};

export default Headers;
