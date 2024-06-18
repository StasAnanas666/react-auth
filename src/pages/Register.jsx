import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../constants";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();//редирект

    //отправка данных пользователя на сервер для регистрации и записи в бд
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${serverUrl}/register`, {
                username,
                password,
            });
            navigate("/login"); //редирект на форму логина
        } catch (error) {
            console.error("Ошибка регистрации: ", error);
        }
    };

    return (
        <div className="w-full grow flex items-center justify-center bg-registerBackground bg-center bg-cover">
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
                    <button className="w-full bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Зарегистрироваться
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
