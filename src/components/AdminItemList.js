import React, {useState} from "react";
import {Accordion, Button, Card, Form, useAccordionButton} from "react-bootstrap";
import productList from '../store_items.json'

class AdminItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storeItems: [],
        };
    }

    saveFile = () => {
        // Save to local storage (later database; cannot update JSON file :/)
        localStorage.setItem('storeItems', JSON.stringify(this.state.storeItems));
    };
    file;

    downloadFile = () => {
        // Make link to file
        const href = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.state.storeItems));
        // Create anchor
        const link = document.createElement('a');
        link.setAttribute('href', href);
        link.setAttribute('download', 'storeItems.json');
        // Add to the document, click it, and remove it
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    componentDidMount() {
        // Read JSON file (later database)
        let items = productList.items;

        console.log(items);
        this.setState({storeItems: items});
        localStorage.setItem('storeItems', JSON.stringify(items));
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.state.storeItems && this.state.storeItems !== nextState.storeItems) {
            if (this.state.storeItems.length === nextState.storeItems.length){
                alert("Updating item...");
            } else if (this.state.storeItems.length < nextState.storeItems.length) {
                alert("Adding new item...");
            } else {
                alert("Deleting item...");
            }
            this.saveFile();
        }
    }

    componentWillUnmount() {
        // The JSON won't update in the home page, but you should see a JSON file in your downloads with updated data
        alert("You will now download the store items as a JSON file. These types of files are harmless as they contain only data.")
        this.downloadFile();
    }

    render() {
        return (
            <div role='main'>
                <h2>Edit Items</h2>
                <div className="admin-item-list">
                    <Accordion style={{ maxWidth: '700px' }} role='list'>
                        {this.state.storeItems.map((item) => (
                            <Card key={item.id} role='listitem'>
                                <Card.Header>
                                    <span style={{ marginRight: '5px' }}>{item.name} ${item.price}</span>
                                    <EditButton eventKey={item.id}>Edit Item</EditButton>
                                </Card.Header>
                                <Accordion.Collapse eventKey={item.id}>
                                    <Card.Body>
                                        <EditItemForm item={item} onSubmit={this.handleSubmit} deleteItem={() => this.deleteItem(item.id)} />
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        ))}
                    </Accordion>
                    <Button onClick={this.createNewItem}>Create New Item</Button>
                </div>
            </div>
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let form = event.target;
        console.log(event);

        this.setState((prevState) => ({
            storeItems: prevState.storeItems.map(item => {
                if (item.id === parseInt(form.elements.itemID.value)) {
                    return {
                        ...item,
                        name: form.elements.itemName.value,
                        price: parseFloat(form.elements.itemPrice.value)
                    };
                }
                return item;
            })
        }));
    }

    getNewID = () => {
        let maxID = this.state.storeItems.reduce((max, item) => {
            return item.id > max ? item.id : max;
        }, 0);

        return maxID + 1;
    }

    createNewItem = () => {
        this.setState((prevState) => ({
            storeItems: [...prevState.storeItems, {
                id: this.getNewID(),
                name: 'New Item',
                price: 0.00,
                image: ''
            }]
        }));
    }

    deleteItem = (id) => {
        this.setState((prevState) => ({
            storeItems: prevState.storeItems.filter(item => item.id !== id)
        }))
    }
}

function EditButton({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => {});
    return (
        <button
        type='button'
        onClick={decoratedOnClick}
        className='editButton'
        >
            {children}
        </button>
    );
}

function EditItemForm({ item, onSubmit, deleteItem }) {
    const [itemName, setItemName] = useState(item.name);
    const [itemPrice, setItemPrice] = useState(item.price);

    return (
        <Form onSubmit={onSubmit} role='form'>
            <Form.Group>
                <Form.Label htmlFor={`itemName${item.id}`}>Name</Form.Label>
                <Form.Control value={itemName} type='text' name='itemName' id={`itemName${item.id}`}
                              onChange={(e) => {
                                  setItemName(e.target.value);
                              }}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor={`itemPrice${item.id}`}>Price</Form.Label>
                <Form.Control value={itemPrice} type='text' name='itemPrice' id={`itemPrice${item.id}`}
                              onChange={(e) => {
                                  setItemPrice(e.target.value);
                              }}
                />
            </Form.Group>
            <Form.Control value={item.id} hidden={true} disabled name='itemID' />
            <Button type='submit' onClick={() => console.log('ID of item: ', item.id)}>Save Item</Button>
            <Button onClick={deleteItem}>Delete Item</Button>
        </Form>
    );
}

export default AdminItemList;