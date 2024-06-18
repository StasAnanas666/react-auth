import { useState, useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../constants";

const Protected = () => {
    const [message, setMessage] = useState("У вас нет доступа к этой странице");

    //сработает один раз при загрузке страницы
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get(`${serverUrl}/protected`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setMessage(response.data.message);
                } catch (error) {
                    console.error(
                        "Ошибка получения доступа к защищенной странице: ",
                        error
                    );
                }
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full grow flex items-center justify-center bg-neutral-700">
            <p className="backdrop-blur-sm bg-white/30 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {message}
            </p>
        </div>
    );
};

export default Protected;
