import './App.css';
import './styles/login.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import HomePage from "./pages/home";
import Error404Page from "./pages/nopage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="*" element={<Error404Page />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
