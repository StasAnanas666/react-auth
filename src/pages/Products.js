import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ProductForm from "../components/ProductForm";
import axios from "axios";
import { serverUrl } from "../constants";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${serverUrl}/products`);
            if (response.status === 200) {
                setProducts(response.data);
            } else {
                console.error("Ошибка загрузки товаров");
            }
        } catch (error) {
            console.error("Ошибка: ", error);
        } finally {
            setLoading(false);
        }
    };

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
        fetchProducts();
        fetchCategories();
    }, [products]);

    //сброс режима редактирования
    const handleProductSubmit = () => {
        setEditingProduct(null);
    };

    const handleEditClick = (product) => {
        console.log(product);
        setEditingProduct(product);
    };

    const handleDeleteClick = async (productId) => {
        try {
            await axios.delete(`${serverUrl}/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
        } catch (error) {
            console.error("Ошибка удаления товара: ", error);
        }
    };

    // if (loading) {
    //     return <Loader />;
    // }

    return (
        <div className="w-full grow items-center justify-center px-12 bg-neutral-700 text-white">
            <h2 className="text-2xl font-bold my-4">Товары</h2>

            <ProductForm
                product={editingProduct != null ? editingProduct : ""}
                categories={categories}
                onSubmit={handleProductSubmit}
                resetForm={() => setEditingProduct(null)}
            />

            <div className="w-full bg-white/30 max-h-33 overflow-y-auto rounded mt-6">
                <ul className="divide-y divide-gray-100">
                    {products.map((product) => (
                        <li
                            className="gap-x-6 py-5 px-8 flex justify-between items-center"
                            key={product.id}
                        >
                            <div className="flex w-5/6 justify-between text-center">
                                <p>{product.name}</p>
                                <p>{product.description}</p>
                                <p>
                                    {
                                        categories.find(
                                            (c) => c.id === product.categoryid
                                        )?.name
                                    }
                                </p>
                                <p>{product.price} руб.</p>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    onClick={() => handleEditClick(product)}
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline mr-4"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                        />
                                    </svg>
                                </button>
                                <button
                                    onClick={() =>
                                        handleDeleteClick(product.id)
                                    }
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Products;
