import useMenu from "../../hooks/UseMenu";
import Loader from "../../components/Loader";
import useSelectsCategory from "../../hooks/UseSelectsCategory";

function Home() {
    const [flashcards] = useSelectsCategory();
    useMenu();

    if (!flashcards) return <Loader />;

    if (flashcards) {
        <main id="home">
            <div className="banner"></div>
            <section>
                <h2>Bienvenu à notre partie de révision !</h2>

                {/* {flashcards.response.map((flashcard) => (
                    <Card key={flashcard.id} flashcard={flashcard} />
                ))} */}
            </section>
        </main>
    }
}

export default Home;