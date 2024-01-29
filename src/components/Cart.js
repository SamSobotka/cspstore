// Adapted from https://www.geeksforgeeks.org/shopping-cart-app-using-react/#
function Cart({
    cartItems,
    deleteFromCart,
    calculateTotal,
    setCartItems
}) {
    return (
        <div className={`cart ${cartItems.length > 0 ? 'active' : ''}`}>
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.item.id} className="cart-item">
                                <div>
                                    <div className="item-info">
                                        <div className="item-image">
                                            <img src={item.item.image} alt={item.item.name}/>
                                        </div>
                                        <div className="item-details">
                                            <h3>{item.item.name}</h3>
                                            <p>${item.item.price}</p>
                                        </div>
                                    </div>
                                    <div className="item-actions">
                                        <button
                                            className="remove-button"
                                            onClick={() => deleteFromCart(item.item)}>
                                            Remove From Cart
                                        </button>
                                        <div className="quantity">
                                            <button
                                                style={{ margin: "1%" }}
                                                onClick={() => {
                                                    setCartItems((prevCartItems) => {
                                                        return prevCartItems.map(
                                                            (prevItem) =>
                                                                prevItem.item.id === item.item.id
                                                                    ? {
                                                                        ...prevItem, quantity:
                                                                            Math.max(item.quantity - 1, 0)
                                                                    }
                                                                    : prevItem
                                                        );
                                                    })
                                                }}>
                                                -
                                            </button>
                                            <p className='quant'>{item.quantity} </p>
                                            <button
                                                onClick={() => {
                                                    setCartItems((prevCartItems) => {
                                                        return prevCartItems.map(
                                                            (prevItem) =>
                                                                prevItem.item.id === item.item.id
                                                                    ? {
                                                                        ...prevItem, quantity:
                                                                            item.quantity + 1
                                                                    }
                                                                    : prevItem
                                                        );
                                                    })
                                                }}>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="checkout-section">
                        <div className="checkout-total">
                            <p className="total">Total Amount:
                                ${calculateTotal()}
                            </p>
                        </div>
                        <button
                            className="checkout-button"
                            disabled={cartItems.length === 0 || calculateTotal() === 0}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;