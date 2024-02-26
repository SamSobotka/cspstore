import { useState } from "react";
import '../styles/login.css';
import {useNavigate} from "react-router-dom";

const backendURL = process.env.REACT_APP_BACKEND_URL || '';

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageDisplay, setErrorMessageDisplay] = useState("none");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${backendURL}/api/login`, {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (data.token) {
                alert(`Successfully logged in! Here's the token: ${data.token}`) // REDO THIS TO ACTUALLY USE TOKEN TO AUTHENTICATE
                navigate("/home");
            } else {
                setErrorMessage(data.message);
                setErrorMessageDisplay('block');
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <form id="login-form" onSubmit={handleSubmit} aria-label='login-form'>
            <h3>Log In</h3>
            <EmailField setEmail={setEmail} /> <br />
            <PasswordField setPassword={setPassword} /> <br />
            <p style={{display: `${errorMessageDisplay}`, color: 'red'}} id="error-message">{errorMessage}</p>
            <input type="submit" value="Login" id="login-submit"/>
        </form>
    );
};

export const RegisterForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageDisplay, setErrorMessageDisplay] = useState("none");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${backendURL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password
                }),
            });

            const data = await response.json();
            if (response.ok) {
                navigate("/");
            } else {
                setErrorMessage(data.message);
                setErrorMessageDisplay('block');
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <form id="register-form" onSubmit={handleSubmit} aria-label='register-form'>
            <h3>Register</h3>
            <FirstNameField setFirstName={setFirstName}/> <br/>
            <LastNameField setLastName={setLastName}/> <br/>
            <EmailField setEmail={setEmail}/> <br/>
            <PasswordField setPassword={setPassword}/> <br/>
            <p style={{display: `${errorMessageDisplay}`, color: 'red'}} id="error-message">{errorMessage}</p>
            <input type="submit" value="Register" id="register-submit"/>
        </form>
    );
};

const FirstNameField = ({setFirstName}) => {
    return (
        <>
            <label htmlFor="firstName" className="Login-label">First Name</label>
            <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                id="firstName"
                className="Login-input"
            />
        </>
    );
};

const LastNameField = ({setLastName}) => {
    return (
        <>
            <label htmlFor="lastName" className="Login-label">Last Name</label>
            <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                id="lastName"
                className="Login-input"
            />
        </>
    );
};

const EmailField = ({setEmail}) => {
    return (
        <>
            <label htmlFor="email" className="Login-label">Email</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="Login-input"
            />
        </>
    );
};

const PasswordField = ({setPassword}) => {
    return (
        <>
            <label htmlFor="password" className="Login-label">Password</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="Login-input"
            />
        </>
    );
};