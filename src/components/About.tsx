import { useState } from "react"

const About: React.FC = () => {

    return (
        <div className="about-container">
            <h1 style={{ fontSize: "60px" }}>About</h1>
            <hr />
            <span style={{ margin: "20px", fontSize: "30px" }}>Guess today's character from Teamfight Tactics!</span>
            <span style={{ margin: "20px", fontSize: "30px", lineHeight: "1.5" }}>TFTdle was created under Riot Games' "Legal Jibber Jabber" 
                policy using assets owned by Riot Games. Riot Games does not endorse or 
                sponsor this project.</span>
            <span style={{ margin: "20px", fontSize: "30px" }}>Heavily inspired by Wordle, LOLdle, Smashdle, and Pokedle.</span>
            <h1 style={{ fontSize: "60px" }}>Feedback</h1>
            <hr />
            <span style={{ margin: "20px", fontSize: "30px" }}>Any errors? Suggestions?</span>
            <span style={{ margin: "20px", fontSize: "30px"}}>DM me on discord! <u>gorillagripcoochie</u></span>
        </div>
    )
}

export default About;