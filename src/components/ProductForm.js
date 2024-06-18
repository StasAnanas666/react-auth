import { serverUrl } from "../constants";
import { useEffect, useState } from "react";
import axios from "axios";

//category может содержать категорию, если форма используется для редактирования
const ProductForm = ({ product = {}, categories = [], onSubmit }) => {
    const [productName, setProductName] = useState(product.name || "");
    const [productDesc, setProductDesc] = useState(product.description || "");
    const [productPrice, setProductPrice] = useState(product.price || "");
    const [categoryId, setCategoryId] = useState(product.categoryid || "");

    useEffect(() => {
        setProductName(product.name || "");
        setProductDesc(product.description || "");
        setProductPrice(product.price || "");
        setCategoryId(product.categoryid || "");
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (product.id) {
                await axios.put(
                    `${serverUrl}/products/${product.id}`,
                    {
                        name: productName,
                        description: productDesc,
                        price: productPrice,
                        categoryid: categoryId,
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
                    `${serverUrl}/products`,
                    {
                        name: productName,
                        description: productDesc,
                        price: productPrice,
                        categoryid: categoryId,
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

    const handleReset = () => {
        setProductName("");
        setProductDesc("");
        setProductPrice("");
        setCategoryId("");
    };

    const handleSelectChange = async(e) => {
        setCategoryId(e.target.value);
        console.log(e.target.value);
    }

    return (
        <form
            className="backdrop-blur-sm bg-white/30 shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
        >
            <div className="mb-2">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="productName"
                >
                    Название товара:{" "}
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Введите название товара..."
                />
            </div>
            <div className="mb-2">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="productDesc"
                >
                    Описание товара:{" "}
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id="productDesc"
                    value={productDesc}
                    onChange={(e) => setProductDesc(e.target.value)}
                    placeholder="Введите название товара..."
                />
            </div>
            <div className="mb-2">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="productPrice"
                >
                    Цена товара(в рублях):{" "}
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    min={0}
                    id="productPrice"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="Введите цену товара..."
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="productCategory"
                >
                    Категория:{" "}
                </label>
                <select
                    id="productCategory"
                    value={categoryId}
                    onChange={handleSelectChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="" disabled>Выберите категорию...</option>
                    {categories.map(category => (
                        <option value={category.id} key={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex items-center">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    {product.id ? "Изменить товар" : "Добавить товар"}
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

export default ProductForm;