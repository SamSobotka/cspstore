import AdminItemList from "../components/AdminItemList";
import {Link} from "react-router-dom";

import '../styles/admin.css';

function Admin() {
    return (
        <div className="App">
            <header className='App-header'>
                <h1>CSP Store</h1>
            </header>
            <div className="admin-page">
                <AdminItemList />
                <Link to='/home' style={{ margin: '0 auto' }}>Back to Home</Link>
            </div>
        </div>
    );
}

export default Admin;