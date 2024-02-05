import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import HomePage from "./pages/home";
import Error404Page from "./pages/nopage";
import Admin from "./pages/admin";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<Error404Page />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
