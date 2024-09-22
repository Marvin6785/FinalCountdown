import { Routes, Route } from "react-router-dom";

import Header from "../views/user/partials/Header";
import Home from "../views/user/Home";
// import Login from "../views/auth/Login";
// import Register from "../views/auth/Register";
import Dashboard from "../views/user/Dashboard";
// import Deck from "../views/user/Deck";
import Footer from "../views/user/partials/Footer";
import ProtectedRouter from "../hoc/ProtectedRoute";

function Router() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />*/}
                <Route path="dashBoard" element={<ProtectedRouter component={Dashboard} />} />
                {/*<Route path="deck" element={<Deck />} />*/}
                <Route path="*" element={<p>NOT FOUND</p>} />
            </Routes>
            <Footer />
        </>
    );
}

export default Router;