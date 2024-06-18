import { serverUrl } from "../constants";
import { useEffect, useState } from "react";
import axios from "axios";

//category может содержать категорию, если форма используется для редактирования
const CategoryForm = ({ category = {}, onSubmit }) => {
    const [categoryName, setCategoryName] = useState(category.name || "");

    useEffect(() => {
        setCategoryName(category.name || "");
    }, [category])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (category.id) {
                await axios.put(
                    `${serverUrl}/categories/${category.id}`,
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
            } else {
                await axios.post(
                    `${serverUrl}/categories`,
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
            }
        } catch (error) {
            console.error("Ошибка: ", error);
        } finally {
            onSubmit();
            handleReset();
        }
    };

    const handleReset = () => { setCategoryName(""); };

    return (
        <form
            className="backdrop-blur-sm bg-white/30 shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
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
                    placeholder="Введите название категории..."
                />
            </div>
            <div className="flex items-center">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    {category.id ? "Изменить категорию" : "Добавить категорию"}
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline ml-6"
                    type="button"
                    onClick={handleReset}
                >
                    Отмена
                </button>
            </div>
        </form>
    );
};

export default CategoryForm;
