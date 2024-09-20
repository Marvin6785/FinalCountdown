import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

import { useUser } from "../../../hooks/UseUser";

function Header() {
    const {logout} = useUser();

    return (
        <header>
            <section>
                <nav>
                    <Link to="/">Accueil</Link>
                </nav>
            </section>

            <h1>Dashboard panel</h1>
            <button onClick={logout}><FontAwesomeIcon icon={faPowerOff} /></button>
        </header>
    );
}

export default Header;