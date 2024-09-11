import Query from "./Query.js";

class Roles {
    /**
     * Retrieves all roles from the database.
     * 
     * @returns {Promise<Array>} A promise that resolves to an array of all roles.
     */
    static async getAllRoles () {
        const query = `
            SELECT 
                *
            FROM roles
        `;
        const response = await Query.run(query);
        return response;
    }

    /**
     * Retrieves a role by its ID.
     * 
     * @param {number} id - The ID of the role to retrieve.
     * @returns {Promise<Object>} A promise that resolves to an object containing the role details.
     */
    static async getByIdRoles (id) {
        const query = `
            SELECT *
            FROM roles
            WHERE roles.id = ?
        `;
        const response = await Query.runWithParams(query, id);
        return response;
    }

    /**
     * Adds a new role to the database.
     * 
     * @param {string} newRole - The name of the new role to add.
     * @returns {Promise<Object>} A promise that resolves to an object containing the result of the insertion.
     */
    static async addRoles (newRole) {
        const query = `
            INSERT INTO roles (role)
            VALUES (?)
        `;
        const response = await Query.runWithParams(query, newRole);
        return response;
    }

    /**
     * Updates an existing role in the database.
     * 
     * @param {Array} data - An array containing the new role name and the ID of the role to update.
     * @returns {Promise<Object>} A promise that resolves to an object containing the result of the update.
     */
    static async updateRoles (data) {
        const query = `
            UPDATE roles SET role = ?
            WHERE id = ?
        `;
        const response = await Query.runWithParams(query, data);
        return response;
    }

    /**
     * Deletes a role from the database.
     * 
     * @param {number} id - The ID of the role to delete.
     * @returns {Promise<void>} A promise indicating that the deletion is complete.
     */
    static async removeRoles (id) {
        const query = `DELETE FROM roles WHERE id = ?`;
        await Query.runWithParams(query, id);
    }
}

export default Roles;