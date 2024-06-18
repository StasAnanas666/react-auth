import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../constants";

const Login = ({ setIsAuthenticated, setName }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); //редирект

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${serverUrl}/login`, {
                username,
                password,
            });
            //записываем токен в LocalStorage под ключом token
            localStorage.setItem("token", response.data.token);
            setIsAuthenticated(true);
            setName(username);
            navigate("/protected"); //редирект на защищенную страницу
        } catch (error) {
            console.error("Ошибка входа: ", error);
        }
    };

    return (
        <div className="w-full grow flex items-center justify-center bg-loginBackground bg-center bg-cover">
            <form
                className="w-1/3 backdrop-blur-sm bg-white/30 shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit}
            >
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="username"
                    >
                        Имя пользователя:{" "}
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Пароль:{" "}
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="w-full bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Войти
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
