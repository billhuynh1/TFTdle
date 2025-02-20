// Component renders after user makes a guess, and displays
// the types of squares i.e correct, partial, incorrect

type HintsItem = { id: string; text: string; color: string };

const HintsHelper = () => {
  const hints: HintsItem[] = [
    { id: "0", text: "correct ✅", color: "correct" },
    { id: "1", text: "partial 🔶", color: "partial" },
    { id: "2", text: "incorrect ❌", color: "incorrect" },
  ];

  return (
    <div className="hintshelper">
      {hints.map((item) => (
        <div key={item.id} className="hintshelper__item">
          <span className="hintshelper__text">
            {item.text}
            <div className={`hintshelper__content ${item.color}`} />
          </span>
        </div>
      ))}
    </div>
  );
};

export default HintsHelper;
