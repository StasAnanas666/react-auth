import { NavLink, useNavigate } from "react-router-dom";

const Menu = ({
    isAuthenticated,
    username,
    handleLogout,
    dropdownOpen,
    setDropdownOpen,
    dropdownRef,
}) => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        handleLogout();
        setDropdownOpen(false);
        navigate("/login");
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="px-12 py-3 bg-gray-800 w-full sticky top-0 z-10">
            <ul className="flex justify-between items-center">
                <li>
                    <NavLink to="/protected" className="text-gray-100 mr-8">
                        Защищенная страница
                    </NavLink>
                    <NavLink to="/categories" className="text-gray-100 mr-8">
                        Категории
                    </NavLink>
                    <NavLink to="/products" className="text-gray-100 mr-8">
                        Товары
                    </NavLink>
                </li>
                {!isAuthenticated ? (
                    <div className="auth-block flex space-x-12">
                        <li>
                            <NavLink to="/login" className="text-gray-100">
                                Войти
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" className="text-gray-100">
                                Зарегистрироваться
                            </NavLink>
                        </li>
                    </div>
                ) : (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={toggleDropdown}
                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm hover:bg-gray-700"
                        >
                            {username}
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-600 rounded-md shadow-lg z-10">
                                <NavLink
                                    to="/profile"
                                    className="block px-4 py-2 text-gray-100 hover:bg-gray-400 hover:rounded-t-md"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Профиль
                                </NavLink>
                                <button
                                    className="w-full text-left block px-4 py-2 text-gray-100 hover:bg-gray-400 hover:rounded-b-md"
                                    onClick={handleLogoutClick}
                                >
                                    Выйти
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </ul>
        </nav>
    );
};

export default Menu;
