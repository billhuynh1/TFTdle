import { PatchNote } from "../type";

const patches: PatchNote[] = [
  {
    version: "v1.4",
    date: "5/05/2025",
    changes: [
      "Included instructions for every game mode. Click the question mark at the top to view.",
      "Updated contact info. Included Reddit and Tiktok",
    ],
  },
  {
    version: "v1.3",
    date: "5/04/2025",
    changes: [
      "Added new 'daily streak' tracker",
      "Fixed a bug with finisher guesses not saving",
    ],
  },
  {
    version: "v1.2",
    date: "5/01/2025",
    changes: [
      "Updated navbar UI",
      "Updated game ending screen UI",
      "Changed button icon",
    ],
  },
  {
    version: "v1.0",
    date: "4/30/2025",
    changes: [
      "Trait game mode added, guess the trait based on the description!",
    ],
  },
];

export default patches;
