import Query from "./Query.js";

class Flashcards {
    /**
     * Retrieves all flashcards from the database.
     * 
     * @returns {Promise<Array>} A promise that resolves to an array of all flashcards with their associated categories.
     */
    static async getAllFlashcards() {
        const query = `
            SELECT 
                flashcards.id, flashcards.question, flashcards.response,
                categories.language
            FROM flashcards
            INNER JOIN categories
                ON categories.id = flashcards.categories_id
        `;
        const response = await Query.run(query);
        return response;
    }

    /**
     * Retrieves a flashcard by its ID.
     * 
     * @param {number} id - The ID of the flashcard to retrieve.
     * @returns {Promise<Object>} A promise that resolves to an object containing the flashcard details and its associated category.
     */
    static async getByIdFlashcards(id) {
        const query = `
            SELECT 
                flashcards.id, flashcards.question, flashcards.response,
                categories.language
            FROM flashcards
            INNER JOIN categories
                ON categories.id = flashcards.categories_id
            WHERE flashcards.id = ?
        `;
        const response = await Query.runWithParams(query, id);
        return response;
    }

    /**
     * Adds a new flashcard to the database.
     * 
     * @param {Array} flashcards - An array containing the question, response, and category ID of the new flashcard.
     * @returns {Promise<Object>} A promise that resolves to an object containing the result of the insertion.
     */
    static async addFlashcards(flashcards) {
        const query = `
            INSERT INTO flashcards (question, response, categories_id)
            VALUES (?, ?, ?)
        `;
        const response = await Query.runWithParams(query, flashcards);
        return response;
    }

    /**
     * Updates an existing flashcard in the database.
     * 
     * @param {Array} data - An array containing the new values and the ID of the flashcard to update.
     * @returns {Promise<Object>} A promise that resolves to an object containing the result of the update.
     */
    static async updateFlashcards(data) {
        const query = `
            UPDATE flashcards SET question = ?, response = ?, categories_id = ?
            WHERE id = ?
        `;
        const response = await Query.runWithParams(query, data);
        return response;
    }

    /**
     * Deletes a flashcard from the database.
     * 
     * @param {number} id - The ID of the flashcard to delete.
     * @returns {Promise<void>} A promise indicating that the deletion is complete.
     */
    static async removeFlashcards(id) {
        const query = `DELETE FROM flashcards WHERE id = ?`;
        await Query.runWithParams(query, id);
    }
}

export default Flashcards;