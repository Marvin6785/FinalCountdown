import { Routes, Route } from "react-router-dom";
import Home from "../views/admin/Home";
import Categories from "../views/admin/Categories";
import Flashcards from "../views/admin/Flashcards";
import AddCards from "../views/admin/AddCards.jsx";
import Header from "../views/admin/partials/Header";

function Router() {
    return (
        <>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="category" element={<Categories />} />
            <Route path="category/flashcard/:id" element={<Flashcards />} />
            <Route path="category/add" element={<AddCards />} />

            <Route path="*" element={<p>NOT FOUND</p>} />
        </Routes>
        </>
    );
}

export default Router;