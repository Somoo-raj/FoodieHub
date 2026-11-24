import "./SearchBar.css";

function SearchBar({ search, setSearch }) {
    return (
        <div className="search-bar">
            <input
                type="text"
                value={search}
                placeholder="Search your favourite food..."
                onChange={(e) => setSearch(e.target.value)} />
        </div>
    )
}

export default SearchBar;