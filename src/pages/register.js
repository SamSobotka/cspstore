import { RegisterForm } from "../components/formComponents";

import '../App.css';
import '../styles/login.css'

function Register() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>CSP Store</h1>
            </header>
            <div className="login-page">
                <div>
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
}

export default Register;