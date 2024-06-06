import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Register from "./components/Register";
import Login from "./components/Login";
import Protected from "./components/Protected";

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                <Menu />
                <Routes>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/protected" element={<Protected />}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App;
