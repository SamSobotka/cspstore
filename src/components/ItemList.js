// Adapted from https://www.geeksforgeeks.org/shopping-cart-app-using-react/#
function ItemList({ filterItems, addToCart }) {
    return (
        <div className="item-list">
            {filterItems.length === 0 ? (
                <p id="no-results">
                    Sorry, no item was found.
                </p>
            ) : (
                filterItems.map((item) => (
                    <div className="item" key={item.id} role="listitem">
                        <img src={item.image} alt={item.name} />
                        <h2>{item.name}</h2>
                        <p>${item.price}</p>
                        <button
                            className="add-to-cart"
                            onClick={() => addToCart(item)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default ItemList;