import Query from "./Query.js";

class Sequences {
    /**
     * Retrieves all sequences from the database.
     * 
     * @returns {Promise<Array>} A promise that resolves to an array of all sequences with their associated users.
     */
    static async getAllSequences() {
        const query = `
            SELECT 
                sequences.id, sequences.status, sequences.res_date,
                users.id
            FROM sequences
            INNER JOIN users
                ON users.id = sequences.user_id
        `;
        const response = await Query.run(query);
        return response;
    }

    /**
     * Retrieves a sequence by its ID.
     * 
     * @param {number} id - The ID of the sequence to retrieve.
     * @returns {Promise<Object>} A promise that resolves to an object containing the sequence details and its associated user.
     */
    static async getByIdSequences(id) {
        const query = `
            SELECT 
                sequences.id, sequences.res_date, sequences.user_id,
                users.nickname, users.email
            FROM sequences
            INNER JOIN users
                ON users.id = sequences.user_id
            WHERE sequences.id = ?
        `;
        const [response] = await Query.runWithParams(query, id);
        return response;
    }

    /**
     * Adds a new sequence to the database.
     * 
     * @param {number} userId - The ID of the user associated with the new sequence.
     * @returns {Promise<Object>} A promise that resolves to an object containing the result of the insertion.
     */
    static async addSequences(userId) {
        const query = `
            INSERT INTO sequences (user_id)
            VALUES  (?)
        `;
        const response = await Query.runWithParams(query, userId);
        return response;
    }

    /**
     * Updates an existing sequence in the database.
     * 
     * @param {Array} data - An array containing the new status, user ID, and the ID of the sequence to update.
     * @returns {Promise<Object>} A promise that resolves to an object containing the result of the update.
     */
    static async updateSequences(data) {
        const query = `
            UPDATE sequences SET status = ?, res_date = NOW(), user_id = ?
            WHERE id = ?
        `;
        const response = await Query.runWithParams(query, data);
        return response;
    }

    /**
     * Deletes a sequence from the database.
     * 
     * @param {number} id - The ID of the sequence to delete.
     * @returns {Promise<void>} A promise indicating that the deletion is complete.
     */
    static async removeSequences(id) {
        const query = `DELETE FROM sequences WHERE id = ?`;
        await Query.runWithParams(query, id);
    }
}

export default Sequences;