import "./App.css";
import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import axios from "axios";
import Menu from "./components/Menu";
import Register from "./components/Register";
import Login from "./components/Login";
import Protected from "./components/Protected";
import Profile from "./components/Profile";
import Loader from "./components/Loader";

const serverUrl = "http://localhost:5000";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);//состояние, которое сохранятеся во всем приложении

    //проверка токена при загрузке приложения
    //если токен есть(т.е. пользователь аутентифицирован, устанавливаем имя пользователя и состояние аутентификации в true)
    //иначе(т.е. пользователь вышел, удаляем токен из localStorage, устанавливаем состояние аутентификации в true)
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get(`${serverUrl}/profile`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUsername(response.data.user.username);
                    setIsAuthenticated(true);
                } catch (error) {
                    if (error.response && error.response.status === 403) {
                        localStorage.removeItem("token");
                        setIsAuthenticated(false);
                    } else {
                        console.error("Ошибка: ", error);
                    }
                }
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        //проверяем состояний dropdown, скрываеем, если раскрыт и наоборот
        const handleClickOutside = (event) => {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    //выход из учетки
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUsername("");
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <Router>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start">
                <Menu
                    isAuthenticated={isAuthenticated}
                    username={username}
                    handleLogout={handleLogout}
                    dropdownOpen={dropdownOpen}
                    setDropdownOpen={setDropdownOpen}
                    dropdownRef={dropdownRef}
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
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
