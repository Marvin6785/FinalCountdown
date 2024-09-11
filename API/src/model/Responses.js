import Query from "./Query.js";

class Responses {
    /**
     * Retrieves all responses from the database.
     * 
     * @returns {Promise<Array>} A promise that resolves to an array of all responses with their associated sequences and flashcards.
     */
    static async getAllResponses() {
        const query = `
            SELECT
                responses.id, responses.mistake,
                sequences.res_date,
                flashcards.id
            FROM responses
            INNER JOIN sequences
                ON sequences.id = responses.sequence_id
            INNER JOIN flashcards
                ON flashcards.id = responses.flashcard_id
        `;
        const response = await Query.run(query);
        return response;
    }

    /**
     * Retrieves a response by its ID.
     * 
     * @param {number} id - The ID of the response to retrieve.
     * @returns {Promise<Object>} A promise that resolves to an object containing the response details and its associated sequence and flashcard.
     */
    static async getByIdResponses(id) {
        const query = `
            SELECT
                responses.id, responses.mistake,
                sequences.res_date,
                flashcards.id
            FROM responses
            INNER JOIN sequences
                ON sequences.id = responses.sequence_id
            INNER JOIN flashcards
                ON flashcards.id = responses.flashcard_id
            WHERE responses.id = ?
        `;
        const response = await Query.runWithParams(query, id);
        return response;
    }
}

export default Responses;