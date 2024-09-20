import Query from "./Query.js";

class Roles {

    // Méthode pour récupérer tous les rôles depuis la base de données
    static async getAllRoles () {
        // Requête SQL pour sélectionner tous les enregistrements de la table 'roles'
        const query = `
            SELECT 
                *
            FROM roles
        `;
        // Exécution de la requête via Query.run et retour des résultats
        const response = await Query.run(query);
        return response;
    }

    static async getByIdRoles (id) {
        const query = `
            SELECT *
            FROM roles
            WHERE roles.id = ?
        `;
        const response = await Query.runWithParams(query, id);
        return response;
    }

    static async addRoles (newRole) {
        const query = `
            INSERT INTO roles (role)
            VALUES (?)
        `;
        const response = await Query.runWithParams(query, newRole);
        return response;
    }

    static async updateRoles (data) {
        const query = `
            UPDATE roles SET role = ?
            WHERE id = ?
        `;
        const response = await Query.runWithParams(query, data);
        return response;
    }

    static async removeRoles (id) {
        const query = `
            DELETE FROM roles 
            WHERE id = ?
        `;
        await Query.runWithParams(query, id);
    }
}

export default Roles;