import pool from "../config/db.js";

class Query {

    // Méthode statique pour exécuter une requête SQL sans paramètres
    static async run(query) {
        // Exécution de la requête en utilisant le pool de connexions à la base de données
        const [result] = await pool.query(query);
        // Retourne les résultats de la requête
        return result;
    }

    // Méthode statique pour exécuter une requête SQL avec des paramètres
    static async runWithParams(query, data) {
        // Exécution de la requête avec des paramètres, sécurisée contre les injections SQL
        // Utilisation de Object.values(data) pour convertir un objet en tableau de valeurs
        const [result] = await pool.execute(query, Object.values(data));
        // Retourne les résultats de la requête
        return result;
    }
}

export default Query;