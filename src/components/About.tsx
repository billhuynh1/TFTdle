import React, { useEffect, useRef } from "react";

interface AboutProps {
  handleToggleAbout: () => void;
}

const About: React.FC<AboutProps> = ({ handleToggleAbout }) => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div ref={aboutRef} className="about-container">
      <div className="about-content">
        <button
          aria-label="Close"
          type="button"
          className="button-close"
          onClick={handleToggleAbout}
        >
          &#x2717;
        </button>
        <h1 style={{ fontSize: "60px", marginLeft: "50px" }}>About</h1>
        <hr />
        <span style={{ margin: "20px", fontSize: "20px", marginLeft: "50px" }}>
          Guess today&apos; character from Teamfight Tactics!
        </span>
        <span
          style={{
            margin: "20px",
            fontSize: "20px",
            lineHeight: "1.5",
            marginLeft: "50px",
          }}
        >
          TFTdle was created under Riot Games&apos; &quot;Legal Jibber
          Jabber&quot; policy using assets owned by Riot Games. Riot Games does
          not endorse or sponsor this project.
        </span>
        <span style={{ margin: "20px", fontSize: "20px", marginLeft: "50px" }}>
          Heavily inspired by Wordle, LOLdle, Smashdle, and Pokedle.
        </span>
        <h1 style={{ fontSize: "60px", marginLeft: "50px" }}>Feedback</h1>
        <hr />
        <span style={{ margin: "20px", fontSize: "20px", marginLeft: "50px" }}>
          Any errors? Suggestions?
        </span>
        <span style={{ margin: "20px", fontSize: "20px", marginLeft: "50px" }}>
          Click the gmail button! There will be more features to come!
        </span>
      </div>
    </div>
  );
};

export default About;
