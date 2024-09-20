import { Link } from "react-router-dom";

function Home() {
    return (
        <main>
            <h1>Back office</h1>
            <nav>
                <Link to="/users">Utilisateurs</Link>
                <Link to="/category">Catégories</Link>
                <Link to="/flashcard">Flashcards</Link>
                {/**<Link to="/sequences">Séquences</Link>
                <Link to="/responses">Réponses</Link>*/}
            </nav>
        </main>
    );
}

export default Home