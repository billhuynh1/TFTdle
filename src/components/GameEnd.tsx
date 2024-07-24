interface GameEndProps {
    attempts: number;
}

const GameEnd:React.FC<GameEndProps> = ({ attempts }) => {
    return (
        <div className="game-end-container">
            <span style={{color: "white",}}>Attempts: {attempts}</span>
        </div>
    )
}

export default GameEnd;