import Query from "./Query.js";

class Categories {

    // Méthode statique pour récupérer toutes les catégories
    static async getAllCategories() {
        // Définition de la requête SQL pour sélectionner toutes les catégories
        const query = `SELECT * FROM categories`;
        // Exécution de la requête et récupération des résultats
        const response = await Query.run(query);
        return response;
    }

    // Méthode statique pour récupérer une catégorie par son ID
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

    // Méthode statique pour ajouter une nouvelle catégorie
    static async addCategories(language) {
        const response = await Query.runWithParams(
            "INSERT INTO categories (language) VALUES (?)",
            language
        );
        return response;
    }

    // Méthode statique pour mettre à jour une catégorie existante
    static async updateCategories(data) {
        const query = `
            UPDATE categories SET language = ?
            WHERE id = ?
        `;
        const response = await Query.runWithParams(query, data);
        return response;
    }

    // Méthode statique pour supprimer une catégorie par son ID
    static async removeCategories(id) {
        const query = `DELETE FROM categories WHERE id = ?`;
        await Query.runWithParams(query, id);
    }
}

export default Categories;