import './App.css';
import './styles/login.css'
import {LoginForm} from "./components/formComponents";

function App() {
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
                <LoginForm/>
            </div>
            <div id="register-message">
                Don't have an account? Register here!
            </div>
        </div>
    </div>
  );
}

export default App;
