import {useDispatch, useSelector} from "react-redux";
import {setCartItems} from "../features/shop/shopSlice";
import Cart from "../components/Cart";

function CartPage() {
    const cartItems = useSelector(state => state.shop.value.cartItems);
    const dispatch = useDispatch();

    const deleteFromCart = (itemToDelete) => {
        const updatedCart = cartItems.filter(item => item.item.id !== itemToDelete.id);
        dispatch(setCartItems(updatedCart));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) =>
            total + item.item.price * item.quantity, 0
        );
    };

    return (
        <div className="App">
            <header className='App-header'>
                <h1>CSP Store</h1>
            </header>
            <div className="cart-container" style={{display: "flex", maxWidth: "fit-content", margin: "0px auto"}}>
                <Cart
                    cartItems={cartItems}
                    calculateTotal={calculateTotal}
                    deleteFromCart={deleteFromCart}
                />
            </div>
        </div>
    );
}

export default CartPage;