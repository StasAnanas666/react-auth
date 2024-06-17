import { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";

const serverUrl = "http://localhost:5000/categories";

const Categories = () => {
    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(serverUrl);
                if (response.status === 200) {
                    setCategories(response.data);
                } else {
                    console.error("Ошибка загрузки категорий");
                }
            } catch (error) {
                console.error("Ошибка: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [categories]);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                serverUrl,
                {
                    name: categoryName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            if (response.status === 201) {
                setCategories([...categories, response.data]);
            } else {
                console.error("Ошибка добавления категории");
            }
            
        } catch (error) {
            console.error("Ошибка: ", error);
        }
        finally {
            setCategoryName("");
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="w-full grow items-center justify-center px-12 bg-neutral-700 text-white">
            <h2 className="text-2xl font-bold my-4">Категории</h2>

            <form
                className="backdrop-blur-sm bg-white/30 shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleAddCategory}
            >
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="categoryName"
                    >
                        Название категории:{" "}
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="categoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </div>
                <div className="flex items-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Добавить категорию
                    </button>
                </div>
            </form>

            <div className="w-full bg-white/30 max-h-80 overflow-y-auto rounded mt-16">
            <ul className="divide-y divide-gray-100">
                {categories.map((category) => (
                    <li className="gap-x-6 py-5 px-8" key={category.id}>{category.name}</li>
                ))}
            </ul>
            </div>         
        </div>
    );
};

export default Categories;
