import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Menu from "./components/Menu";
import Register from "./components/Register";
import Login from "./components/Login";
import Protected from "./components/Protected";

const serverUrl = "http://localhost:5000";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");

    //проверка токена при загрузке приложения
    //если токен есть(т.е. пользователь аутентифицирован, устанавливаем имя пользователя и состояние аутентификации в true)
    //иначе(т.е. пользователь вышел, удаляем токен из localStorage, устанавливаем состояние аутентификации в true)
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get(`${serverUrl}/protected`, {
                        headers: { Authorization: token },
                    });
                    setUsername(response.data.user.username);
                    setIsAuthenticated(true);
                } catch (error) {
                    localStorage.removeItem("token");
                    setIsAuthenticated(false);
                }
            }
        };

        fetchData();
    }, []);

    //выход из учетки
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUsername("");
    };

    return (
        <Router>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start">
                <Menu
                    isAuthenticated={isAuthenticated}
                    username={username}
                    handleLogout={handleLogout}
                />
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <Login
                                setIsAuthenticated={setIsAuthenticated}
                                setName={setUsername}
                            />
                        }
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/protected" element={<Protected />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
