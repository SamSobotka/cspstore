import {useState} from "react";
import SearchBar from "../components/SearchBar";
import ItemList from "../components/ItemList";
import {useSelector, useDispatch} from "react-redux";
import {setCartItems} from "../features/shop/shopSlice";

import "../styles/home.css";
import {Link} from "react-router-dom";

// Mostly adapted from https://www.geeksforgeeks.org/shopping-cart-app-using-react/#
function HomePage() {
    // const [items, setItems] = useState(productList.items);
    // const [cartItems, setCartItems] = useState([]);
    const items = useSelector(state => state.shop.value.storeItems);
    const cartItems = useSelector(state => state.shop.value.cartItems);
    const [itemSearched, setItemSearched] = useState('');

    const dispatch = useDispatch();

    const addToCart = (itemToAdd) => {
        const itemExists = cartItems.length > 0 ?
            cartItems.find(item => item.item.id === itemToAdd.id) :
            null;
        if (itemExists) {
            const updatedCart = cartItems.map(item =>
                item.item.id === itemToAdd.id ? {
                    ...item, quantity: item.quantity + 1
                }
                : item
            );
            dispatch(setCartItems(updatedCart));
        } else {
            dispatch(setCartItems([...cartItems, {item: itemToAdd, quantity: 1}]));
        }
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) =>
            total + item.quantity, 0
        );
    };

    const searchFor = (event) => {
        setItemSearched(event.target.value);
    };

    const filterItems = items.filter((item) =>
        item.name.toLowerCase().includes(itemSearched.toLowerCase())
    );

    return (
        <div className="App">
            <header className='App-header'>
                <h1>CSP Store</h1>
                <div className="navbar-home">
                    <SearchBar
                        itemSearched={itemSearched}
                        searchFor={searchFor}
                    />
                    <Link to={"/cart"} className="cart-button">
                        <button>Cart: {getTotalItems()} item(s)</button>
                    </Link>
                </div>
            </header>
            <div className="home" role="main">
                <ItemList
                    filterItems={filterItems}
                    addToCart={addToCart}
                />
            </div>
            <div className="admin">
                <hr/>
                <Link to="/admin">Edit Item List (Admin)</Link>
            </div>
        </div>
    );
}

export default HomePage;