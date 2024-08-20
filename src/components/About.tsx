import { useState } from "react"

const About: React.FC = () => {

    return (
        <div className="about-container">
            <h1>About</h1>
            <hr />
            <span className="instruction-paragraph">Guess today's character from Teamfight Tactics!</span>
            <span>TFTdle was created under Riot Games' "Legal Jibber Jabber" 
                policy using assets owned by Riot Games. Riot Games does not endorse or 
                sponsor this project.</span>
        </div>
    )
}

export default About;