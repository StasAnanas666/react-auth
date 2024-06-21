import { serverUrl } from "../constants";
import { useEffect, useState } from "react";
import axios from "axios";

//category может содержать категорию, если форма используется для редактирования
const ProductForm = ({
    product = {},
    categories = [],
    onSubmit,
    resetForm,
}) => {
    const [productName, setProductName] = useState(product.name || "");
    const [productDesc, setProductDesc] = useState(product.description || "");
    const [productPrice, setProductPrice] = useState(product.price || "");
    const [productImage, setProductImage] = useState(null);
    const [productQuantity, setProductQuantity] = useState(
        product.quantity || ""
    );
    const [categoryId, setCategoryId] = useState(product.categoryid || "");

    useEffect(() => {
        setProductName(product.name || "");
        setProductDesc(product.description || "");
        setProductPrice(product.price || "");
        setProductQuantity(product.quantity || "");
        setCategoryId(product.categoryid || "");
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", productName);
        formData.append("description", productDesc);
        formData.append("price", productPrice);
        formData.append("categoryid", categoryId);
        if (productImage) {
            formData.append("image", productImage);
        }
        formData.append("quantity", productQuantity);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            };

            if (product.id) {
                const response = await axios.put(
                    `${serverUrl}/products/${product.id}`,
                    formData,
                    config
                );
                console.log(response.data);
            } else {
                const response = await axios.post(
                    `${serverUrl}/products`,
                    formData,
                    config
                );
                console.log(response.data);
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
        setProductQuantity("");
        setProductImage(null);
        resetForm();
    };

    const handleSelectChange = async (e) => {
        setCategoryId(e.target.value);
        console.log(e.target.value);
    };

    const handleImageChange = async (e) => {
        setProductImage(e.target.files[0]);
        console.log(e.target.files[0].name);
    };

    return (
        <form
            className="backdrop-blur-sm bg-white/30 shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
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
                    <option value="" disabled>
                        Выберите категорию...
                    </option>
                    {categories.map((category) => (
                        <option value={category.id} key={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
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
            <div className="mb-2">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="productQuantity"
                >
                    Количество товара:{" "}
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    min={0}
                    id="productQuantity"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                    placeholder="Введите количество товара..."
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="productImage"
                >
                    Фото товара:{" "}
                </label>
                <input
                    type="file"
                    className="shadow appearance-none block w-full text-sm text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                    id="productImage"
                    onChange={handleImageChange}
                />
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
