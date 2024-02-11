// Adapted from https://www.geeksforgeeks.org/shopping-cart-app-using-react/#
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCartItems} from "../features/shop/shopSlice";

function Cart({
    cartItems,
    deleteFromCart,
    calculateTotal
}) {
    const dispatch = useDispatch();

    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <Link to="/home">Add some items!</Link>
                </div>

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
                                                    const newCartItems = cartItems.map(
                                                        (prevItem) =>
                                                            prevItem.item.id === item.item.id
                                                                ? {
                                                                    ...prevItem, quantity:
                                                                        Math.max(item.quantity - 1, 0)
                                                                }
                                                                : prevItem
                                                    );
                                                    dispatch(setCartItems(newCartItems));
                                                }}>
                                                -
                                            </button>
                                            <p className='quant'>{item.quantity} </p>
                                            <button
                                                onClick={() => {
                                                    const newCartItems = cartItems.map(
                                                        (prevItem) =>
                                                            prevItem.item.id === item.item.id
                                                                ? {
                                                                    ...prevItem, quantity:
                                                                        item.quantity + 1
                                                                }
                                                                : prevItem
                                                    );
                                                    dispatch(setCartItems(newCartItems));
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
                        <Link to={"/home"}>
                            <button
                                className="continue-shopping"
                            >Continue Shopping</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;