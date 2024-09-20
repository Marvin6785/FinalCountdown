import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCards() {
    const [categories, setCategories] = useState(null);
    const [flashcards, setFlashcards] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch(
                "http://localhost:9000/api/v1/category",
                {
                    credentials: "include",
                }
            );
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setCategories(data);
            }
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        async function fetchFlashcard() {
            const response = await fetch(
                "http://localhost:9000/api/v1/flashcard",
                {
                    credentials: "include",
                }
            );
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setFlashcards(data);
            }
        }
        fetchFlashcard();
    }, []);

    useEffect(() => {
        if (categories && flashcards) {
            setIsLoading(false);
        }
    }, [categories, flashcards]);

    async function submitHandler(e) {
        try {
            e.preventDefault();
            const card = e.target;
            const cardData = new FormData(card);

            const response = await fetch(
                "http://localhost:9000/api/v1/flashcard"
            )
        }
    }
}