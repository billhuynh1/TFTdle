import SubmitButton from "./SubmitButton";

const SearchBar: React.FC = () => {
    return (
        <div className="searchbar">
            <form>
                <input
                    type="text"
                    id="guess"
                    className="searchbar"
                    placeholder="Type champion name ..."
                />
            </form>
            <SubmitButton/>
        </div>
    )
}

export default SearchBar;