import { NavLink, useNavigate } from "react-router-dom";

const Menu = ({ isAuthenticated, username, handleLogout }) => {
    const navigate = useNavigate();

    return (
        <nav className="px-12 py-3 bg-gray-800 w-full sticky top-0">
            <ul className="flex justify-between">
                <li>
                    <NavLink to="/protected" className="text-gray-100">
                        Защищенная страница
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
                    <div className="relative">
                        <button
                            className="text-gray-100"
                        >
                            {username}
                        </button>
                        <div
                            className="absolute right-0 mt-2 w-48 bg-gray-600 rounded-md shadow-lg z-10"
                        >
                            <NavLink
                                to="/profile"
                                className="block px-4 py-2 text-gray-100 hover:bg-gray-400 hover:rounded-t-md"
                            >
                                Профиль
                            </NavLink>
                            <button
                                className="w-full text-left block px-4 py-2 text-gray-100 hover:bg-gray-400 hover:rounded-b-md"
                                onClick={() => {
                                    handleLogout();
                                    navigate("/login");
                                }}
                            >
                                Выйти
                            </button>
                        </div>
                    </div>
                )}
            </ul>
        </nav>
    );
};

export default Menu;
