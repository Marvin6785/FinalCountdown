import Query from "./Query.js";

class Sequences {

    // Récupère toutes les séquences et les infos des utilisateurs associés
    static async getAllSequences() {
        const query = `
            SELECT 
                sequences.id, sequences.status, sequences.res_date,
                users.id
            FROM sequences
            INNER JOIN users
                ON users.id = sequences.user_id
        `;
        // Exécute la requête et renvoie les résultats
        const response = await Query.run(query);
        return response;
    }

    // Récupère une séquence par son ID
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
        // Exécute la requête avec l'ID et renvoie la séquence
        const [response] = await Query.runWithParams(query, id);
        return response;
    }

    // Ajoute une nouvelle séquence liée à un utilisateur
    static async addSequences(userId) {
        const query = `
            INSERT INTO sequences (user_id)
            VALUES  (?)
        `;
        // Ajoute la séquence avec l'ID de l'utilisateur
        const response = await Query.runWithParams(query, userId);
        return response;
    }

    // Met à jour une séquence (statut, date, utilisateur)
    static async updateSequences(data) {
        const query = `
            UPDATE sequences SET status = ?, res_date = NOW(), user_id = ?
            WHERE id = ?
        `;
        // Met à jour les infos de la séquence avec les données fournies
        const response = await Query.runWithParams(query, data);
        return response;
    }

    // Supprime une séquence par son ID
    static async removeSequences(id) {
        const query = `
            DELETE FROM sequences 
            WHERE id = ?
        `;
        // Supprime la séquence en fonction de l'ID fourni
        await Query.runWithParams(query, id);
    }
}

export default Sequences;