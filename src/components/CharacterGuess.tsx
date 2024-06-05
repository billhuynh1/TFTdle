import React from "react";

export default function CharacterGuess() {
    return (
        <div>
            <form>
                <input
                    type="text"
                    id="guess"
                    className="searchbar"
                    placeholder="Type champion name ..."
                />
                <button>submit</button>
            </form>
        </div>
    ) 
}
