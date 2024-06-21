import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { serverUrl } from "../constants";

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const fetchProducts = async () => {
        const response = await axios.get(`${serverUrl}/products`);
        setProducts(response.data);
    };

    const fetchCategories = async () => {
        const response = await axios.get(`${serverUrl}/categories`);
        setCategories(response.data);
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    return (
        <div className="w-full grow items-center justify-center px-12 bg-neutral-700 text-white">
            <div className="mx-auto my-6">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Catalog;
