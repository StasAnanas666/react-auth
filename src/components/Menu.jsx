import { NavLink } from "react-router-dom"

const Menu = () => {
    return (
        <div className="mb-4">
            <ul className="flex space-x-4">
                <li>
                    <NavLink to="/login" className="text-blue-500">
                        Войти
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/register" className="text-blue-500">
                        Зарегистрироваться
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/protected" className="text-blue-500">
                        Защищенная страница
                    </NavLink>
                </li>
                <li></li>
                <li></li>
            </ul>
        </div>
    )
}

export default Menu;