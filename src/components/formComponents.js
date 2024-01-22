import { useState } from "react";
import '../styles/login.css';

export const LoginForm = () => {
    return (
        <form id="login-form">
            <h3>Log In</h3>
            <EmailField/> <br/>
            <PasswordField/> <br/>
            <input type="submit" value="Login" id="login-submit"/>
        </form>
    );
};

export const RegisterForm = () => {
    return (
        <form id="register-form">
            <h3>Register</h3>
            <FirstNameField/> <br/>
            <LastNameField/> <br/>
            <EmailField/> <br/>
            <PasswordField/> <br/>
            <input type="submit" value="Register" id="register-submit"/>
        </form>
    );
};

const FirstNameField = () => {
    const [firstName, setFirstName] = useState("");
    return (
        <>
            <label htmlFor="firstName" className="Login-label">First Name</label>
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                id="firstName"
                className="Login-input"
            />
        </>
    );
};

const LastNameField = () => {
    const [lastName, setLastName] = useState("");
    return (
        <>
            <label htmlFor="lastName" className="Login-label">Last Name</label>
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id="lastName"
                className="Login-input"
            />
        </>
    );
};

const EmailField = () => {
    const [email, setEmail] = useState("");
    return (
        <>
            <label htmlFor="email" className="Login-label">Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="Login-input"
            />
        </>
    );
};

const PasswordField = () => {
    const [password, setPassword] = useState("");
    return (
        <>
            <label htmlFor="password" className="Login-label">Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="Login-input"
            />
        </>
    );
};