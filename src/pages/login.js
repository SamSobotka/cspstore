import { LoginForm } from "../components/formComponents";

import '../App.css';
import '../styles/login.css'
import {Link} from "react-router-dom";

function Login() {
    return (
        <div className="App">
            <header className='App-header'>
                <h1>CSP Store</h1>
            </header>
            <div className="login-page">
                <div>
                    <h2 id="login">You must be logged in to use the store!</h2>
                </div>
                <div>
                    <LoginForm />
                </div>
                <div id="register-message">
                    Don't have an account? <Link to="/register" id="register-link">Register here!</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;