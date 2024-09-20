import Query from "./Query.js";

class Users {

    // Récupère tous les utilisateurs et leurs rôles associés
    static async getAllUsers() {
        const query = `
            SELECT
                users.id, users.nickname, users.email, users.created_At, users.last_connection,
                roles.role
            FROM users
            INNER JOIN roles
                ON roles.id = users.role_id
        `;
        // Exécute la requête et renvoie tous les utilisateurs
        const response = await Query.run(query);
        return response;
    }

    // Récupère un utilisateur par son ID
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
        // Exécute la requête avec l'ID et renvoie l'utilisateur correspondant
        const response = await Query.runWithParams(query, id);
        return response;
    }

    // Récupère un utilisateur par son email
    static async getByEmailUsers(email) {
        const query = `
            SELECT *
            FROM users
            WHERE email = ?
        `;
        // Exécute la requête avec l'email et renvoie l'utilisateur trouvé
        const response = await Query.runWithParams(query, email);
        return response;
    }

    // Ajoute un nouvel utilisateur dans la base de données
    static async addUsers(newUser) {
        const query = `
            INSERT INTO users (nickname, email, password) 
            VALUES (?, ?, ?)
        `;
        // Exécute la requête avec les infos du nouvel utilisateur
        const response = await Query.runWithParams(query, newUser);
        return response;
    }

    // Met à jour les infos d'un utilisateur
    static async updateUsers(data) {
        const query = `
            UPDATE users
            SET nickname = ?, email = ?, password = ?
            WHERE id = ?
        `;
        // Exécute la requête avec les nouvelles données de l'utilisateur
        const response = await Query.runWithParams(query, data);
        return response;
    }

    // Supprime un utilisateur par son ID
    static async removeUsers(id) {
        const query = `
            DELETE FROM users
            WHERE id = ?
        `;
        // Exécute la requête pour supprimer l'utilisateur
        const response = await Query.runWithParams(query, id);
        return response;
    }

    // Met à jour la dernière connexion d'un utilisateur
    static async updateLastConnection(id) {
        const query = `
            UPDATE users 
            SET last_connection = NOW() 
            WHERE id = ? 
        `;
        // Exécute la requête pour mettre à jour la date de dernière connexion
        const response = await Query.runWithParams(query, id);
        return response;
    }
}

export default Users;