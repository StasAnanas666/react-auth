import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import CategoryForm from "../components/CategoryForm";
import axios from "axios";
import { serverUrl } from "../constants";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${serverUrl}/categories`);
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

    useEffect(() => {
        fetchCategories();
    }, [categories]);

    //сброс режима редактирования
    const handleCategorySubmit = () => {
        setEditingCategory(null);
    };

    const handleEditClick = (category) => {
        setEditingCategory(category);
    }

    const handleDeleteClick = async(categoryId) => {
        try {
            await axios.delete(`${serverUrl}/categories/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "token"
                    )}`,
                },
            })
        } catch (error) {
            console.error("Ошибка удаления категории: ", error);
        }
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="w-full grow items-center justify-center px-12 bg-neutral-700 text-white">
            <h2 className="text-2xl font-bold my-4">Категории</h2>

            <CategoryForm
                category={editingCategory != null ? editingCategory : ""}
                onSubmit={handleCategorySubmit}
            />

            <div className="w-full bg-white/30 max-h-80 overflow-y-auto rounded mt-16">
                <ul className="divide-y divide-gray-100">
                    {categories.map((category) => (
                        <li
                            className="gap-x-6 py-5 px-8 flex justify-between items-center"
                            key={category.id}
                        >
                            {category.name}
                            <div className="flex w-1/6 justify-between">
                                <button onClick={() => handleEditClick(category)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline">Изменить</button>
                                <button onClick={() => handleDeleteClick(category.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline">Удалить</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Categories;
