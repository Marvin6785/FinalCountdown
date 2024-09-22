import { useEffect, useState } from "react";
import { customFetch } from "../services/api";

function useSelectsCategory() {
    const [flashcards, setFlashcards] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await customFetch("/flashcard", "POST");

                const responseParsed = response.json();

                setFlashcards(responseParsed);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    return [flashcards];
}

export default useSelectsCategory;