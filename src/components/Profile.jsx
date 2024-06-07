import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";

const serverUrl = "http://localhost:5000";

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get(`${serverUrl}/profile`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setProfile(response.data.user);
                } catch (error) {
                    console.error("Ошибка загрузки данных профиля: ", error);
                }
            }
        };

        fetchProfile();
    }, []);

    if (!profile) {
        return <Loader />;
    }

    return (
        <div className="w-full grow flex justify-start bg-neutral-700">
            <div className="backdrop-blur-sm bg-white/30 shadow-md rounded m-6 px-8 pt-6 pb-8 w-1/3">
                <h2 className="text-gray-100 text-lg font-bold mb-4">
                    Данные пользователя:{" "}
                </h2>
                <p>Имя пользователя: {profile.username}</p>
                <p>Роль: {profile.role}</p>
            </div>
        </div>
    );
};

export default Profile;
