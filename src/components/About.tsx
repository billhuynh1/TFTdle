import React from "react";

const About: React.FC = () => {
  return (
    <>
      <div className="modal-category">
        <span className="modal-info-text" style={{ lineHeight: "2" }}>
          Guess today&apos;s champion, chibi, little legend, and trait from
          Teamfight Tactics!
          <br />
          TFTdle was created under Riot Games&apos;{" "}
          <a
            style={{ color: "#57aecf" }}
            href="https://www.riotgames.com/en/legal"
          >
            Legal Jibber Jabber
          </a>{" "}
          policy using assets owned by Riot Games.
          <br />
          Riot Games does not endorse or sponsor this project.
          <br />
          <br />
          Heavily inspired by Wordle, LOLdle, Smashdle, and Pokedle.
          <br />
          <br />
          Big fan of Teamfight Tactics and daily games, so I wanted to create
          something for this amazing game and community!
        </span>
      </div>
      <h1 className="modal-title">Feedbacks or Questions</h1>
      <hr />
      <div className="modal-category">
        <span className="modal-info-text">
          If you have any suggestions or feedback, feel free to DM me on Reddit,
          TikTok, or Email!
          <br />
        </span>
      </div>
    </>
  );
};

export default About;
