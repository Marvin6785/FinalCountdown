import { NavLink, Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faBars,
//     faUser,
//     faXmark,
// } from "@fortawesome/free-solid-svg-icons";

import { useUser } from "../../../hooks/UseUser";
import useMenu from "../../../hooks/UseMenu";
import logo from "../../../assets/images/FlashCardMaster_transparent.webp";

function Header() {
    const { user, logout } = useUser();
    const { isMenuOpen, toggleMenu } = useMenu();

    return (
        <header>
            {isMenuOpen && <div className="overlayOn" onClick={toggleMenu} />}
            <div>
                {/* <button onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </button> */}
                <h1>
                    <Link to={"/"}>
                        <img src={logo} />
                    </Link>
                </h1>
            </div>

            {isMenuOpen && (
                <nav className="burger-menu">
                    <button onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <Link to={"/"}>Page d&apos;accueil FlashCardMaster</Link>
                    <hr />

                    <Link to={"/"}>HTML</Link>
                    <Link to={"/"}>CSS</Link>
                    <Link to={"/"}>JavaScript</Link>
                    <Link to={"/"}>Node.js</Link>
                    <Link to={"/"}>React</Link>

                    {user.isLogged && (
                        <>
                            <NavLink to={"/dashboard"} className={"bar-nav"}>
                                Compte
                            </NavLink>
                            <button
                                onClick={logout}
                                className={"bar-nav"}
                            >
                                Déconnexion
                            </button>
                        </>
                    )}
                </nav>
            )}
            <nav>
                {!user.isLogged && (
                    <NavLink to={"login"} className={"bar-nav"}>
                        Connexion
                    </NavLink>
                )}
                {user.isLogged && (
                    <>
                        <NavLink to={"/dashboard"} className={"bar-nav"}>
                            {user.nickname} <FontAwesomeIcon icon={faUser} />
                        </NavLink>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header;