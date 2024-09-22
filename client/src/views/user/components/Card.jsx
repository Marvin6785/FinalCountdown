import PropTypes from "prop-types";

function Card({ flashcard }) {
    const { addToResponse } = useResponse();
    return (
        <article key={flashcard.id}>
            <p>{flashcard.question}</p>
            <button onClick={() => addToResponse(flashcard)}>
                
            </button>
        </article>
    )
}