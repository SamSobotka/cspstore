import {act, cleanup, fireEvent, render, screen, within} from '@testing-library/react';
import App from './App';

import Admin from "./pages/admin";
import HomePage from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Error404Page from "./pages/nopage";
import CartPage from "./pages/cart";

import {Provider} from "react-redux";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit";
import shopReducer from "./features/shop/shopSlice";

// *** Setup and teardown *** \\
let store = null;

beforeEach(() => {
    store = configureStore({
        reducer: {
            shop: shopReducer
        }
    });
});

afterEach(() => {
    cleanup();
    store = null;
});

// *** Rendering tests *** \\
// Test 1
test('renders login page on startup', () => {
    const { unmount } = render(<App />);

    const titleElement = screen.getByText(/CSP Store/i);
    const loginPromptElement = screen.getByText(/You must be logged in to use the store!/i);
    const registerMessageElement = screen.getByText(/Don't have an account\?/i);
    const registerMessageLinkElement = screen.getByText(/Register here!/i);
    const loginButtonElement = screen.getByText(/Login/i);

    expect(titleElement).toBeInTheDocument();
    expect(loginPromptElement).toBeInTheDocument();
    expect(registerMessageElement).toBeInTheDocument();
    expect(registerMessageLinkElement).toBeInTheDocument();
    expect(loginButtonElement).toBeInTheDocument();

    // Tear down the test
    unmount();
});

// Test 2
test('renders register page when register link is clicked', () => {
    const { unmount } = render(<App />);

    const registerMessageLinkElement = screen.getByText(/Register here!/i);
    act(() => {
        registerMessageLinkElement.click();
    });

    const titleElement = screen.getByText(/CSP Store/i);
    const registerPromptElement = screen.getByRole('heading', {level: 3});
    const registerButtonElement = screen.getByRole('button', {name: /Register/i});

    expect(titleElement).toBeInTheDocument();
    expect(registerPromptElement).toBeInTheDocument();
    expect(registerButtonElement).toBeInTheDocument();

    // Tear down the test
    unmount();
});

// Test 3
test('renders home page when home link is clicked', () => {
    const { unmount } = render(
        <Provider store={store}>
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        </Provider>
    );

    const titleElement = screen.getByText(/CSP Store/i);
    const searchBarElement = screen.getByRole('textbox');
    const cartButtonElement = screen.getByRole('link', {name: /Cart/i});
    const itemListElement = screen.getByRole('main');
    const itemElements = screen.getAllByRole('listitem');
    const itemButtonElements = screen.getAllByRole('button', {name: /Add to Cart/i});
    const adminLinkElement = screen.getByRole('link', {name: /Edit Item List \(Admin\)/i});

    expect(titleElement).toBeInTheDocument();
    expect(searchBarElement).toBeInTheDocument();
    expect(cartButtonElement).toBeInTheDocument();
    expect(itemListElement).toBeInTheDocument();
    expect(itemElements).toHaveLength(3);
    expect(itemButtonElements).toHaveLength(3);
    expect(adminLinkElement).toBeInTheDocument();

    // Tear down the test
    unmount();
});

// Test 4
test('renders admin page when admin link is clicked', () => {
    window.alert = jest.fn();

    const { unmount } = render(
        <Provider store={store}>
            <MemoryRouter>
                <Routes>
                    <Route path="/admin" element={<Admin />} />
                    <Route index={true} element={<HomePage />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );

    // Click the link to the admin page
    const adminLinkElement = screen.getByText(/Edit Item List \(Admin\)/i);
    act(() => {
        adminLinkElement.click();
    });

    expect(window.alert).toHaveBeenCalled();

    const titleElement = screen.getByText(/CSP Store/i);
    const adminPromptElement = screen.getByRole('heading', {level: 2});
    const createNewItemButtonElement = screen.getByRole('button', {name: /Create New Item/i});
    const homeLinkElement = screen.getByText(/Back to Home/i);

    expect(titleElement).toBeInTheDocument();
    expect(adminPromptElement).toBeInTheDocument();
    expect(createNewItemButtonElement).toBeInTheDocument();
    expect(homeLinkElement).toBeInTheDocument();

    // Tear down the test
    unmount();
});

// Test 5
test('renders cart page when cart button is clicked', () => {
    const { unmount } = render(
        <Provider store={store}>
            <MemoryRouter>
                <Routes>
                    <Route path="/cart" element={<CartPage />} />
                    <Route index={true} element={<HomePage />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );

    // Click the cart button
    const linkElements = screen.getAllByRole('link');
    let linkToCart;
    for (const link of linkElements) {
        if (within(link).getByRole('button', {name: /Cart: \d+ item\(s\)/i})) {
            linkToCart = link;
            break;
        }
    }

    if (!linkToCart) {
        throw new Error("No cart button found");
    }

    act(() => {
        linkToCart.click();
    });

    const titleElement = screen.getByText(/CSP Store/i);
    const cartPromptElement = screen.getByRole('heading', {level: 2});
    const emptyCartMessageElement = screen.getByText(/Your cart is empty/i);
    const homeLinkElement = screen.getByText(/Add some items!/i);

    expect(titleElement).toBeInTheDocument();
    expect(cartPromptElement).toBeInTheDocument();
    expect(emptyCartMessageElement).toBeInTheDocument();
    expect(homeLinkElement).toBeInTheDocument();

    // Tear down the test
    unmount();
});

// Test 6
test('renders 404 page when non-existent page is visited', () => {
    const { unmount } = render(
        <Provider store={store}>
            <MemoryRouter>
                <Routes>
                    <Route index={true} element={<HomePage />} />
                    <Route path="*" element={<Error404Page />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );

    // Visit a non-existent page (any link on the home page will lead to a non-existent page because the route is not defined)
    const linkElement = screen.getAllByRole('link')[0];
    act(() => {
        linkElement.click();
    });

    const error404TitleElement = screen.getByText(/Error 404/i);
    const error404DescriptionElement = screen.getByRole('heading', {level: 2});

    expect(error404TitleElement).toBeInTheDocument();
    expect(error404DescriptionElement).toBeInTheDocument();

    // Tear down the test
    unmount();
});

// Test 7
test('renders login form on login page', () => {
    const { unmount } = render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );

    const titleElement = screen.getByText(/CSP Store/i);
    const loginFormElement = screen.getByRole('form');
    const usernameInputElement = screen.getByLabelText(/Email/i);
    const passwordInputElement = screen.getByLabelText(/Password/i);
    const loginButtonElement = screen.getByRole('button', {name: /Login/i});
    const registerMessageElement = screen.getByText(/Don't have an account\?/i);
    const registerMessageLinkElement = screen.getByText(/Register here!/i);

    expect(titleElement).toBeInTheDocument();
    expect(loginFormElement).toBeInTheDocument();
    expect(usernameInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
    expect(loginButtonElement).toBeInTheDocument();
    expect(registerMessageElement).toBeInTheDocument();
    expect(registerMessageLinkElement).toBeInTheDocument();

    // Tear down the test
    unmount();
});

// Test 8
test('renders register form on register page', () => {
    const { unmount } = render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );

    const titleElement = screen.getByText(/CSP Store/i);
    const registerFormElement = screen.getByRole('form');
    const firstNameInputElement = screen.getByLabelText(/First Name/i);
    const lastNameInputElement = screen.getByLabelText(/Last Name/i);
    const usernameInputElement = screen.getByLabelText(/Email/i);
    const passwordInputElement = screen.getByLabelText(/Password/i);
    const registerButtonElement = screen.getByRole('button', {name: /Register/i});

    expect(titleElement).toBeInTheDocument();
    expect(registerFormElement).toBeInTheDocument();
    expect(firstNameInputElement).toBeInTheDocument();
    expect(lastNameInputElement).toBeInTheDocument();
    expect(usernameInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
    expect(registerButtonElement).toBeInTheDocument();

    // Tear down the test
    unmount();
});

// Test 9
test('renders item list on home page', () => {
    const { unmount } = render(
        <Provider store={store}>
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        </Provider>
    );

    const itemListElement = screen.getByRole('main');
    const itemElements = screen.getAllByRole('listitem');

    expect(itemListElement).toBeInTheDocument();
    expect(itemElements).toHaveLength(3);

    for (const item of itemElements) {
        const imageElement = within(item).getByRole('img');
        const nameElement = within(item).getByRole('heading', {level: 2});
        const priceElement = within(item).getByText(/^\$/);
        const buttonElement = within(item).getByRole('button', {name: /Add to Cart/i});

        expect(imageElement).toBeInTheDocument();
        expect(nameElement).toBeInTheDocument();
        expect(priceElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
    }

    // Tear down the test
    unmount();
});

// Test 10
test('renders item list on admin page', () => {
    window.alert = jest.fn();

    const { unmount } = render(
        <Provider store={store}>
            <MemoryRouter>
                <Admin />
            </MemoryRouter>
        </Provider>
    );

    const itemListElement = screen.getByRole('main');
    const itemElements = screen.getAllByRole('listitem');

    expect(itemListElement).toBeInTheDocument();
    expect(itemElements).toHaveLength(3);

    for (const item of itemElements) {
        const nameAndPriceElement = within(item).getByText(/[a-zA-Z]+ \$\d+.\d{2}/);
        const buttonElement = within(item).getByRole('button', {name: /Edit Item/i});

        expect(nameAndPriceElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();

        const editFormElement = within(item).getByRole('form');
        const nameInputElement = within(item).getByLabelText(/Name/i);
        const priceInputElement = within(item).getByLabelText(/Price/i);
        const saveButtonElement = within(item).getByRole('button', {name: /Save Item/i});
        const deleteButtonElement = within(item).getByRole('button', {name: /Delete Item/i});

        expect(editFormElement).toBeInTheDocument();
        expect(nameInputElement).toBeInTheDocument();
        expect(priceInputElement).toBeInTheDocument();
        expect(saveButtonElement).toBeInTheDocument();
        expect(deleteButtonElement).toBeInTheDocument();
    }

    // Tear down the test
    unmount();
});

// *** Interaction tests *** \\
// Test 11
test('adds an item to the cart', () => {
    const { unmount } = render(
        <Provider store={store}>
            <MemoryRouter>
                <Routes>
                    <Route path="/cart" element={<CartPage />} />
                    <Route index={true} element={<HomePage />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );

    // Add an item to the cart
    const itemButtonElements = screen.getAllByRole('button', {name: /Add to Cart/i});
    act(() => {
        itemButtonElements[0].click();
    });

    const cartButtonElement = screen.getByRole('link', {name: /Cart: 1 item\(s\)/i});
    expect(cartButtonElement).toBeInTheDocument();

    // Go to the cart
    const linkElements = screen.getAllByRole('link');
    let linkToCart;
    for (const link of linkElements) {
        if (within(link).getByRole('button', {name: /Cart: \d+ item\(s\)/i})) {
            linkToCart = link;
            break;
        }
    }

    if (!linkToCart) {
        throw new Error("No cart button found");
    }

    act(() => {
        linkToCart.click();
    });

    const cartItemElements = screen.getAllByRole('listitem');
    expect(cartItemElements).toHaveLength(1);

    // Tear down the test
    unmount();
});

// Test 12
test('adds multiple items that are different to the cart', () => {
    const { unmount } = render(
        <Provider store={store}>
            <MemoryRouter>
                <Routes>
                    <Route path="/cart" element={<CartPage />} />
                    <Route index={true} element={<HomePage />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );

    // Add an item to the cart
    const itemButtonElements = screen.getAllByRole('button', {name: /Add to Cart/i});
    act(() => {
        itemButtonElements[0].click();
    });

    // Add another item to the cart
    act(() => {
        itemButtonElements[1].click();
    });

    const cartButtonElement = screen.getByRole('link', {name: /Cart: 2 item\(s\)/i});
    expect(cartButtonElement).toBeInTheDocument();

    // Go to the cart
    const linkElements = screen.getAllByRole('link');
    let linkToCart;
    for (const link of linkElements) {
        if (within(link).getByRole('button', {name: /Cart: \d+ item\(s\)/i})) {
            linkToCart = link;
            break;
        }
    }

    if (!linkToCart) {
        throw new Error("No cart button found");
    }

    act(() => {
        linkToCart.click();
    });

    const cartItemElements = screen.getAllByRole('listitem');
    expect(cartItemElements).toHaveLength(2);

    for (const item of cartItemElements) {
        const removeButtonElement = within(item).getByRole('button', {name: /Remove From Cart/i});
        expect(removeButtonElement).toBeInTheDocument();
    }

    // Tear down the test
    unmount();
});

// Test 13
test('adds multiple of the same item to the cart', () => {
    const { unmount } = render(
        <Provider store={store}>
            <MemoryRouter>
                <Routes>
                    <Route path="/cart" element={<CartPage />} />
                    <Route index={true} element={<HomePage />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );

    // Add an item to the cart
    const itemButtonElements = screen.getAllByRole('button', {name: /Add to Cart/i});
    act(() => {
        itemButtonElements[0].click();
    });

    // Add the same item to the cart again
    act(() => {
        itemButtonElements[0].click();
    });

    const cartButtonElement = screen.getByRole('link', {name: /Cart: 2 item\(s\)/i});
    expect(cartButtonElement).toBeInTheDocument();

    // Go to the cart
    const linkElements = screen.getAllByRole('link');
    let linkToCart;
    for (const link of linkElements) {
        if (within(link).getByRole('button', {name: /Cart: \d+ item\(s\)/i})) {
            linkToCart = link;
            break;
        }
    }

    if (!linkToCart) {
        throw new Error("No cart button found");
    }

    act(() => {
        linkToCart.click();
    });

    const cartItemElements = screen.getAllByRole('listitem');
    expect(cartItemElements).toHaveLength(1);

    const quantityElement = within(cartItemElements[0]).getByText(/2/);
    expect(quantityElement).toBeInTheDocument();

    // Tear down the test
    unmount();
});

// Test 14
test('increases and decreases the quantity of an item in the cart from the cart page', () => {
    const { unmount } = render(
        <Provider store={store}>
            <MemoryRouter>
                <Routes>
                    <Route path="/cart" element={<CartPage />} />
                    <Route index={true} element={<HomePage />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );

    // Add an item to the cart
    const itemButtonElements = screen.getAllByRole('button', {name: /Add to Cart/i});
    act(() => {
        itemButtonElements[0].click();
    });

    // Go to the cart
    const linkElements = screen.getAllByRole('link');
    let linkToCart;
    for (const link of linkElements) {
        if (within(link).getByRole('button', {name: /Cart: \d+ item\(s\)/i})) {
            linkToCart = link;
            break;
        }
    }

    if (!linkToCart) {
        throw new Error("No cart button found");
    }

    act(() => {
        linkToCart.click();
    });

    const quantityElement = screen.getByText(/1/);
    expect(quantityElement).toBeInTheDocument();

    // Increase the quantity of the item
    const increaseButtonElement = screen.getByRole('button', {name: /\+/});
    act(() => {
        increaseButtonElement.click();
    });

    expect(quantityElement).toHaveTextContent(/2/);

    // Decrease the quantity of the item
    const decreaseButtonElement = screen.getByRole('button', {name: /-/});
    act(() => {
        decreaseButtonElement.click();
    });

    expect(quantityElement).toHaveTextContent(/1/);

    // Tear down the test
    unmount();
});

// Test 15
test('sets item quantity to 0 and deletes an item from the cart from the cart page', () => {
    const { unmount } = render(
        <Provider store={store}>
            <MemoryRouter>
                <Routes>
                    <Route path="/cart" element={<CartPage />} />
                    <Route index={true} element={<HomePage />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );

    // Add an item to the cart
    const itemButtonElements = screen.getAllByRole('button', {name: /Add to Cart/i});
    act(() => {
        itemButtonElements[0].click();
    });

    // Go to the cart
    const linkElements = screen.getAllByRole('link');
    let linkToCart;
    for (const link of linkElements) {
        if (within(link).getByRole('button', {name: /Cart: \d+ item\(s\)/i})) {
            linkToCart = link;
            break;
        }
    }

    if (!linkToCart) {
        throw new Error("No cart button found");
    }

    act(() => {
        linkToCart.click();
    });

    const cartItemElements = screen.getAllByRole('listitem');
    expect(cartItemElements).toHaveLength(1);

    const quantityElement = screen.getByText(/1/);
    expect(quantityElement).toBeInTheDocument();

    // Decrease the quantity of the item to 0
    const decreaseButtonElement = screen.getByRole('button', {name: /-/});
    act(() => {
        decreaseButtonElement.click();
    });

    expect(quantityElement).toHaveTextContent(/0/);

    // Delete the item from the cart
    const removeButtonElement = screen.getByRole('button', {name: /Remove From Cart/i});
    act(() => {
        removeButtonElement.click();
    });

    const emptyCartMessageElement = screen.getByText(/Your cart is empty/i);
    expect(emptyCartMessageElement).toBeInTheDocument();

    // Tear down the test
    unmount();
});

// Test 16
test('searches for an item on the home page', () => {
    const { unmount } = render(
        <Provider store={store}>
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        </Provider>
    );

    const searchBarElement = screen.getByRole('textbox');
    expect(searchBarElement).toBeInTheDocument();
    const itemElements = screen.getAllByRole('listitem');
    expect(itemElements).toHaveLength(3);

    // Search for an item
    fireEvent.change(searchBarElement, {target: {value: 'Calculator'}});
    expect(searchBarElement).toHaveValue('Calculator');

    const filteredItemElements = screen.getAllByRole('listitem');
    expect(filteredItemElements).toHaveLength(1);

    const filteredItemNameElement = within(filteredItemElements[0]).getByText(/Calculator/i);
    expect(filteredItemNameElement).toBeInTheDocument();

    // Tear down the test
    unmount();
});

// Test 17
test('searches for an item on the home page with multiple results', () => {
    const { unmount } = render(
        <Provider store={store}>
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        </Provider>
    );

    const searchBarElement = screen.getByRole('textbox');
    expect(searchBarElement).toBeInTheDocument();
    const itemElements = screen.getAllByRole('listitem');
    expect(itemElements).toHaveLength(3);

    // Search for an item
    fireEvent.change(searchBarElement, {target: {value: 'Intro'}});
    expect(searchBarElement).toHaveValue('Intro');

    const filteredItemElements = screen.getAllByRole('listitem');
    expect(filteredItemElements).toHaveLength(2);

    const filteredItemNameElement = within(filteredItemElements[0]).getByText(/Intro to Python/i);
    const filteredItemNameElement2 = within(filteredItemElements[1]).getByText(/Intro to Java/i);
    expect(filteredItemNameElement).toBeInTheDocument();
    expect(filteredItemNameElement2).toBeInTheDocument();

    // Tear down the test
    unmount();
});

// Test 18
test('searches for an item on the home page with no results', () => {
    const { unmount } = render(
        <Provider store={store}>
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        </Provider>
    );

    const searchBarElement = screen.getByRole('textbox');
    expect(searchBarElement).toBeInTheDocument();
    const itemElements = screen.getAllByRole('listitem');
    expect(itemElements).toHaveLength(3);

    // Search for an item
    fireEvent.change(searchBarElement, {target: {value: 'Pencil'}});
    expect(searchBarElement).toHaveValue('Pencil');

    const noResultsMessageElement = screen.getByText(/Sorry, no item was found./i);
    expect(noResultsMessageElement).toBeInTheDocument();

    // Tear down the test
    unmount();
});

// Test 19
test('adds a new item to the store on the admin page (and editing)', () => {
    window.alert = jest.fn();

    const { unmount } = render(
        <Provider store={store}>
            <MemoryRouter>
                <Admin />
            </MemoryRouter>
        </Provider>
    );

    const createNewItemButtonElement = screen.getByRole('button', {name: /Create New Item/i});
    act(() => {
        createNewItemButtonElement.click();
    });
    expect(window.alert).toHaveBeenCalled();

    const itemElements = screen.getAllByRole('listitem');
    expect(itemElements).toHaveLength(4);

    const newItemElement = itemElements[3];
    const editNewItemButtonElement = within(newItemElement).getByRole('button', {name: /Edit Item/i});
    expect(newItemElement).toBeInTheDocument();
    expect(editNewItemButtonElement).toBeInTheDocument();

    const nameInputElement = within(newItemElement).getByLabelText(/Name/i);
    const priceInputElement = within(newItemElement).getByLabelText(/Price/i);
    const editItemForm = within(newItemElement).getByRole('form');

    expect(nameInputElement).toHaveValue('New Item');
    expect(priceInputElement).toHaveValue('0');

    fireEvent.change(nameInputElement, {target: {value: 'Test Item'}});
    fireEvent.change(priceInputElement, {target: {value: '10.00'}});

    expect(nameInputElement).toHaveValue('Test Item');
    expect(priceInputElement).toHaveValue('10.00');

    fireEvent.submit(editItemForm);

    expect(window.alert).toHaveBeenCalled();

    // Tear down the test
    unmount();
});

// Test 20
test('deletes an item from the store on the admin page', () => {
    window.alert = jest.fn();

    const { unmount } = render(
        <Provider store={store}>
            <MemoryRouter>
                <Admin />
            </MemoryRouter>
        </Provider>
    );

    const itemElements = screen.getAllByRole('listitem');
    expect(itemElements).toHaveLength(3);

    const deleteButtonElement = within(itemElements[0]).getByRole('button', {name: /Delete Item/i});
    act(() => {
        deleteButtonElement.click();
    });

    expect(window.alert).toHaveBeenCalled();

    const updatedItemElements = screen.getAllByRole('listitem');
    expect(updatedItemElements).toHaveLength(2);

    // Tear down the test
    unmount();
});
