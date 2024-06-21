import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <Link key={product.id} to={`/catalog/${product.id}`} className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                    src={product.image}
                    alt={product.description}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
            </div>
            <h3 className="mt-4 text-sm text-white">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-white">
                {product.price} руб.
            </p>
        </Link>
    );
};

export default ProductCard;
