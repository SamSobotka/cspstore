// Adapted from https://www.geeksforgeeks.org/shopping-cart-app-using-react/#
function SearchBar({ itemSearched, searchFor }) {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search the store..."
                value={itemSearched}
                onChange={searchFor}
            />
        </div>
    );
}

export default SearchBar;