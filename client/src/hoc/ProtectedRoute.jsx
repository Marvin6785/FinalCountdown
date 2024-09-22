import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/UseUser";

function ProtectedRoute({ component: Component }) {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.islogged) {
            navigate("/");
        }
    }, [user]);

    if (user.isLogged) {
        return <Component />;
    }
}

ProtectedRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;