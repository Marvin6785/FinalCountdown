import Query from "./Query.js";

class Categories {
    /**
     * Retrieves all categories from the database.
     * 
     * @returns {Promise<Array>} A promise that resolves to an array of all categories.
     */
    static async getAllCategories() {
        const query = `SELECT * FROM categories`;
        const response = await Query.run(query);
        return response;
    }

    /**
     * Retrieves a category by its ID.
     * 
     * @param {number} id - The ID of the category to retrieve.
     * @returns {Promise<Object>} A promise that resolves to an object containing the category details.
     */
    static async getByIdCategories(id) {
        const query = `
            SELECT
                categories.id, language
            FROM categories
            WHERE categories.id = ?
        `;
        const response = await Query.runWithParams(query, id);
        return response;
    }

    /**
     * Adds a new category to the database.
     * 
     * @param {string} language - The name of the new category to add.
     * @returns {Promise<Object>} A promise that resolves to an object containing the result of the insertion.
     */
    static async addCategories(language) {
        const response = await Query.runWithParams(
            "INSERT INTO categories (language) VALUES (?)",
            language
        );
        return response;
    }

    /**
     * Updates an existing category in the database.
     * 
     * @param {Array} data - An array containing the new values and the ID of the category to update.
     * @returns {Promise<Object>} A promise that resolves to an object containing the result of the update.
     */
    static async updateCategories(data) {
        const query = `
            UPDATE categories SET language = ?
            WHERE id = ?
        `;
        const response = await Query.runWithParams(query, data);
        return response;
    }

    /**
     * Deletes a category from the database.
     * 
     * @param {number} id - The ID of the category to delete.
     * @returns {Promise<void>} A promise indicating that the deletion is complete.
     */
    static async removeCategories(id) {
        const query = `DELETE FROM categories WHERE id = ?`;
        await Query.runWithParams(query, id);
    }
}

export default Categories;