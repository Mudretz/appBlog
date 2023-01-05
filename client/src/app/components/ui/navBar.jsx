import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";
const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <nav className="navbar navbar-light bg-light mb-3 shadow p-3 mb-5 bg-body rounded">
            <div className="container">
                <ul className="nav text-start">
                    <li className="nav-item">
                        <Link className="nav-link ps-0 text-dark" aria-current="page" to="/">
                            Главная
                        </Link>
                    </li>
                    {isLoggedIn && (
                        <li className="nav-item">
                            <Link
                                className="nav-link text-dark"
                                aria-current="page"
                                to="/users"
                            >
                                Пользователи
                            </Link>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li className="nav-item">
                            <Link
                                className="nav-link text-dark"
                                aria-current="page"
                                to="/blogAdmin"
                            >
                                Управление
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {isLoggedIn ? (
                        <NavProfile />
                    ) : (
                        <>
                            <Link
                                className="nav-link"
                                aria-current="page"
                                to="/login"
                            >
                                Войти
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
