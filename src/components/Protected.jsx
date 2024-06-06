import { useState, useEffect } from "react";
import axios from "axios";

const serverUrl = "http://localhost:5000";

const Protected = () => {
    const [message, setMessage] = useState("");

    //сработает один раз при загрузке страницы
    useEffect(() => {
        const fetchData = async() => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${serverUrl}/protected`, {
                    headers: {Authorization: token},
                });
                setMessage(response.data.message);
            } catch (error) {
                console.error("Ошибка получения доступа к защищенной странице: ", error);
            }
        }

        fetchData();
    }, [])

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-neutral-700">
            <p className="backdrop-blur-sm bg-white/30 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {message}
            </p>
        </div>
    )
}

export default Protected;