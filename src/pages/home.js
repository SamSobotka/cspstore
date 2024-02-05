import {useState} from "react";
import SearchBar from "../components/SearchBar";
import ItemList from "../components/ItemList";
import Cart from "../components/Cart";
import productList from "../store_items.json";

import "../styles/home.css"
import {Link} from "react-router-dom";

// Mostly adapted from https://www.geeksforgeeks.org/shopping-cart-app-using-react/#
function HomePage() {
    const [items, setItems] = useState(productList.items);
    const [cartItems, setCartItems] = useState([]);
    const [itemSearched, setItemSearched] = useState('');

    const addToCart = (itemToAdd) => {
        const itemExists = cartItems.find(item => item.item.id = itemToAdd.id);
        if (itemExists) {
            const updatedCart = cartItems.map(item =>
                item.item.id === itemToAdd.id ? {
                    ...item, quantity: item.quantity + 1
                }
                : item
            );
            setCartItems(updatedCart);
        } else {
            setCartItems([...cartItems, {item: itemToAdd, quantity: 1}]);
        }
    };

    const deleteFromCart = (itemToDelete) => {
        const updatedCart = cartItems.filter(item => item.item.id !== itemToDelete.id);
        setCartItems(updatedCart);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) =>
            total + item.item.price * item.quantity, 0
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
                <SearchBar
                    itemSearched={itemSearched}
                    searchFor={searchFor}
                />
            </header>
            <div className="home">
                <ItemList
                    filterItems={filterItems}
                    addToCart={addToCart}
                />
                <Cart
                    cartItems={cartItems}
                    calculateTotal={calculateTotal}
                    deleteFromCart={deleteFromCart}
                    setCartItems={setCartItems}
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