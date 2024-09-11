import Query from "./Query.js";

class Users {
    /**
     * Retrieves all users from the database.
     * 
     * @returns {Promise<Array>} A promise that resolves to an array of all users with their associated roles.
     */
    static async getAllUsers() {
        const query = `
            SELECT
                users.id, users.nickname, users.email, users.created_At, users.last_connection,
                roles.role
            FROM users
            INNER JOIN roles
                ON roles.id = users.role_id
        `;
        const response = await Query.run(query);
        return response;
    }

    /**
     * Retrieves a user by their ID.
     * 
     * @param {number} id - The ID of the user to retrieve.
     * @returns {Promise<Object>} A promise that resolves to an object containing the user's details and their associated role.
     */
    static async getByIdUsers(id) {
        const query = `
            SELECT
                users.id, users.nickname, users.email, users.created_At, users.last_connection,
                roles.role
            FROM users
            INNER JOIN roles
                ON roles.id = users.role_id
            WHERE users.id = ?
        `;
        const response = await Query.runWithParams(query, id);
        return response;
    }

    /**
     * Retrieves a user by their email.
     * 
     * @param {string} email - The email of the user to retrieve.
     * @returns {Promise<Object>} A promise that resolves to an object containing the user's details.
     */
    static async getByEmailUsers(email) {
        const query = `
            SELECT *
            FROM users
            WHERE email = ?
        `;
        const response = await Query.runWithParams(query, email);
        console.log(response);
        return response;
    }

    /**
     * Adds a new user to the database.
     * 
     * @param {Array} newUser - An array containing the nickname, email, and password of the new user.
     * @returns {Promise<Object>} A promise that resolves to an object containing the result of the insertion.
     */
    static async addUsers(newUser) {
        const query = `
            INSERT INTO users (nickname, email, password) 
            VALUES (?, ?, ?)
        `;
        const response = await Query.runWithParams(query, newUser);
        return response;
    }

    /**
     * Updates an existing user in the database.
     * 
     * @param {Array} data - An array containing the new nickname, email, password, and the ID of the user to update.
     * @returns {Promise<Object>} A promise that resolves to an object containing the result of the update.
     */
    static async updateUsers(data) {
        const query = `
            UPDATE users
            SET nickname = ?, email = ?, password = ?
            WHERE id = ?
        `;
        const response = await Query.runWithParams(query, data);
        return response;
    }

    /**
     * Deletes a user from the database.
     * 
     * @param {number} id - The ID of the user to delete.
     * @returns {Promise<Object>} A promise that resolves to an object containing the result of the deletion.
     */
    static async removeUsers(id) {
        const query = `
            DELETE FROM users
            WHERE id = ?
        `;
        const response = await Query.runWithParams(query, id);
        return response;
    }

    /**
     * Updates the last connection time of a user.
     * 
     * @param {number} id - The ID of the user to update.
     * @returns {Promise<Object>} A promise that resolves to an object containing the result of the update.
     */
    static async updateLastConnection(id) {
        const query = `
            UPDATE users 
            SET last_connection = NOW() 
            WHERE id = ? 
        `;
        const response = await Query.runWithParams(query, id);
        return response;
    }
}

export default Users;