import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import axios from "axios";
import { serverUrl } from "../constants";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState("");

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${serverUrl}/products/${id}`);
            if (response.status == 200) {
                setProduct(response.data);
                setMainImage(response.data.images[0]);
                console.log(response.data.images[0]);
                console.log(response.data);
            } else {
                console.error("Ошибка загрузки товара");
            }
        } catch (error) {
            console.error("Ошибка: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="w-full grow items-center justify-center px-12 bg-neutral-700 text-white">
            <div className="mx-auto mt-6 lg:grid lg:grid-cols-[1fr_2fr] lg:gap-x-16">
                <div className="sm:overflow-hidden sm:rounded-lg">
                    {mainImage && (
                        <img
                        src={mainImage}
                        alt={product.name}
                        className="lg:h-fit lg:w-full w-full h-full rounded-lg object-cover object-center"
                    />
                    )}
                    

                    <div className="grid grid-flow-col auto-cols-auto mt-6 gap-6">
                        {product.images && product.images.length > 1 &&
                            product.images.map((image, index) => (
                                <button key={index} onClick={() => setMainImage(image)}>
                                    <img
                                        className="rounded-lg object-cover object-center"
                                        src={image}
                                        alt={product.name}
                                    />
                                </button>
                            ))}
                    </div>
                </div>

                <div className="flex flex-col justify-between h-full px-4 pb-16 pt-10">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            {product.name}
                        </h1>
                        <p className="text-3xl tracking-tight">
                            {product.price} руб.
                        </p>
                    </div>

                    <div>
                        <h3 className="sr-only">Description</h3>

                        <div className="space-y-6">
                            <p className="text-base">{product.description}</p>
                        </div>
                    </div>

                    <div className="mt-12 lg:col-span-2 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                reviews.average > rating
                                                    ? "text-yellow-600"
                                                    : "text-gray-200",
                                                "h-5 w-5 flex-shrink-0"
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">
                                    {reviews.average} out of 5 stars
                                </p>
                                <a
                                    href={reviews.href}
                                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    {reviews.totalCount} reviews
                                </a>
                            </div>
                        </div>

                        <form className="mt-10">
                            <button
                                type="submit"
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Add to bag
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
