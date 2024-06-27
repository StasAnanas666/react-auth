import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { serverUrl } from "../constants";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
    ChevronDownIcon,
    FunnelIcon,
    MinusIcon,
    PlusIcon,
    Squares2X2Icon,
} from "@heroicons/react/20/solid";

const sortOptions = [
    { name: "Most Popular", href: "#", current: true },
    { name: "Best Rating", href: "#", current: false },
    { name: "Newest", href: "#", current: false },
    { name: "Price: Low to High", href: "#", current: false },
    { name: "Price: High to Low", href: "#", current: false },
];
const subCategories = [
    { name: "Totes", href: "#" },
    { name: "Backpacks", href: "#" },
    { name: "Travel Bags", href: "#" },
    { name: "Hip Bags", href: "#" },
    { name: "Laptop Sleeves", href: "#" },
];
const filters = [
    {
        id: "color",
        name: "Color",
        options: [
            { value: "white", label: "White", checked: false },
            { value: "beige", label: "Beige", checked: false },
            { value: "blue", label: "Blue", checked: true },
            { value: "brown", label: "Brown", checked: false },
            { value: "green", label: "Green", checked: false },
            { value: "purple", label: "Purple", checked: false },
        ],
    },
    {
        id: "category",
        name: "Category",
        options: [
            { value: "new-arrivals", label: "New Arrivals", checked: false },
            { value: "sale", label: "Sale", checked: false },
            { value: "travel", label: "Travel", checked: true },
            { value: "organization", label: "Organization", checked: false },
            { value: "accessories", label: "Accessories", checked: false },
        ],
    },
    {
        id: "size",
        name: "Size",
        options: [
            { value: "2l", label: "2L", checked: false },
            { value: "6l", label: "6L", checked: false },
            { value: "12l", label: "12L", checked: false },
            { value: "18l", label: "18L", checked: false },
            { value: "20l", label: "20L", checked: false },
            { value: "40l", label: "40L", checked: true },
        ],
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const fetchProducts = async (categoryId = "") => {
        const response = await axios.get(`${serverUrl}/products`, {
            params: { categoryId },
        });
        setProducts(response.data);
    };

    const fetchCategories = async () => {
        const response = await axios.get(`${serverUrl}/categories`);
        setCategories(response.data);
    };

    useEffect(() => {
        fetchProducts(selectedCategory);
        fetchCategories();
    }, [selectedCategory]);

    return (
        <div className="w-full grow items-center justify-center px-12 bg-neutral-700 text-white">
            <div className="mx-auto my-6">
                <div>
                    {/* Mobile filter dialog */}
                    <Dialog
                        className="relative z-40 lg:hidden"
                        open={mobileFiltersOpen}
                        onClose={setMobileFiltersOpen}
                    >
                        <DialogBackdrop
                            transition
                            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                        />

                        <div className="fixed inset-0 z-40 flex">
                            <DialogPanel
                                transition
                                className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                            >
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium ">
                                        Filters
                                    </h2>
                                    <button
                                        type="button"
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                        onClick={() =>
                                            setMobileFiltersOpen(false)
                                        }
                                    >
                                        <span className="sr-only">
                                            Close menu
                                        </span>
                                        <XMarkIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>

                                {/* Filters */}
                                <div className="mt-4 border-t border-gray-200">
                                    <h3 className="sr-only">Categories</h3>
                                    <ul
                                        role="list"
                                        className="px-2 py-3 font-medium "
                                    >
                                        {categories.map((category) => (
                                            <li key={category.name}>
                                                <button
                                                    onClick={() => {
                                                        setSelectedCategory(
                                                            category.id
                                                        );
                                                        console.log(
                                                            category.id
                                                        );
                                                    }}
                                                    className="block px-2 py-3"
                                                >
                                                    {category.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>

                                    {filters.map((section) => (
                                        <Disclosure
                                            as="div"
                                            key={section.id}
                                            className="border-t border-gray-200 px-4 py-6"
                                        >
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium ">
                                                                {section.name}
                                                            </span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon
                                                                        className="h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                ) : (
                                                                    <PlusIcon
                                                                        className="h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                )}
                                                            </span>
                                                        </DisclosureButton>
                                                    </h3>
                                                    <DisclosurePanel className="pt-6">
                                                        <div className="space-y-6">
                                                            {section.options.map(
                                                                (
                                                                    option,
                                                                    optionIdx
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            option.value
                                                                        }
                                                                        className="flex items-center"
                                                                    >
                                                                        <input
                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={
                                                                                option.value
                                                                            }
                                                                            type="checkbox"
                                                                            defaultChecked={
                                                                                option.checked
                                                                            }
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                        >
                                                                            {
                                                                                option.label
                                                                            }
                                                                        </label>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </DisclosurePanel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </div>
                            </DialogPanel>
                        </div>
                    </Dialog>

                    <main className="mx-auto">
                        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
                            <h1 className="text-4xl font-bold tracking-tight ">
                                Каталог
                            </h1>

                            <div className="flex items-center">
                                <Menu
                                    as="div"
                                    className="relative inline-block text-left"
                                >
                                    <div>
                                        <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-400 hover:text-gray-100">
                                            Сортировка
                                            <ChevronDownIcon
                                                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                        </MenuButton>
                                    </div>

                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-neutral-200 shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <MenuItem key={option.name}>
                                                    {({ focus }) => (
                                                        <a
                                                            href={option.href}
                                                            className={classNames(
                                                                option.current
                                                                    ? "font-medium text-gray-700"
                                                                    : "text-gray-500",
                                                                focus
                                                                    ? "bg-gray-100"
                                                                    : "",
                                                                "block px-4 py-2 text-sm"
                                                            )}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </MenuItem>
                                            ))}
                                        </div>
                                    </MenuItems>
                                </Menu>

                                <button
                                    type="button"
                                    className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                                >
                                    <span className="sr-only">View grid</span>
                                    <Squares2X2Icon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </button>
                                <button
                                    type="button"
                                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                    onClick={() => setMobileFiltersOpen(true)}
                                >
                                    <span className="sr-only">Filters</span>
                                    <FunnelIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        </div>

                        <section
                            aria-labelledby="products-heading"
                            className="pb-24 pt-6"
                        >
                            <h2 id="products-heading" className="sr-only">
                                Products
                            </h2>

                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                {/* Filters */}
                                <div className="hidden lg:block">
                                    <h3 className="sr-only">Categories</h3>
                                    <ul
                                        role="list"
                                        className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium "
                                    >
                                        {categories.map((category) => (
                                            <li key={category.name}>
                                                <button
                                                    onClick={() => {
                                                        setSelectedCategory(
                                                            category.id
                                                        );
                                                        console.log(
                                                            category.id
                                                        );
                                                    }}
                                                >
                                                    {category.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>

                                    {filters.map((section) => (
                                        <Disclosure
                                            as="div"
                                            key={section.id}
                                            className="border-b border-gray-200 py-6"
                                        >
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-my-3 flow-root">
                                                        <DisclosureButton className="flex w-full items-center justify-between bg-neutral-700 py-3 text-sm text-gray-200 hover:text-gray-500">
                                                            <span className="font-medium ">
                                                                {section.name}
                                                            </span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon
                                                                        className="h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                ) : (
                                                                    <PlusIcon
                                                                        className="h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                )}
                                                            </span>
                                                        </DisclosureButton>
                                                    </h3>
                                                    <DisclosurePanel className="pt-6">
                                                        <div className="space-y-4">
                                                            {section.options.map(
                                                                (
                                                                    option,
                                                                    optionIdx
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            option.value
                                                                        }
                                                                        className="flex items-center"
                                                                    >
                                                                        <input
                                                                            id={`filter-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={
                                                                                option.value
                                                                            }
                                                                            type="checkbox"
                                                                            defaultChecked={
                                                                                option.checked
                                                                            }
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                            className="ml-3 text-sm text-gray-200"
                                                                        >
                                                                            {
                                                                                option.label
                                                                            }
                                                                        </label>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </DisclosurePanel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </div>

                                {/* Product grid */}
                                <div className="lg:col-span-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                    {products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}
                                </div>
                            </div>
                        </section>
                    </main>
                </div>

                {/* <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8"></div> */}
            </div>
        </div>
    );
};

export default Catalog;
