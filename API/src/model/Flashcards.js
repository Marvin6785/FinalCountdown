import Query from "./Query.js";

class Flashcards {

    // Méthode statique pour récupérer toutes les flashcards
    static async getAllFlashcards() {
        // Requête SQL pour sélectionner toutes les flashcards et les informations de leur catégorie
        const query = `
            SELECT 
                flashcards.id, flashcards.question, flashcards.response,
                categories.language
            FROM flashcards
            INNER JOIN categories
                ON categories.id = flashcards.categories_id
        `;
        // Exécution de la requête et récupération des résultats
        const response = await Query.run(query);
        return response;
    }

    // Méthode statique pour récupérer une flashcard par son ID
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

    // Méthode statique pour ajouter une nouvelle flashcard
    static async addFlashcards(flashcards) {
        const query = `
            INSERT INTO flashcards (question, response, categories_id)
            VALUES (?, ?, ?)
        `;
        const response = await Query.runWithParams(query, flashcards);
        return response;
    }

    // Méthode statique pour mettre à jour une flashcard existante
    static async updateFlashcards(data) {
        const query = `
            UPDATE flashcards SET question = ?, response = ?, categories_id = ?
            WHERE id = ?
        `;
        const response = await Query.runWithParams(query, data);
        return response;
    }

    // Méthode statique pour supprimer une flashcard par son ID
    static async removeFlashcards(id) {
        const query = `DELETE FROM flashcards WHERE id = ?`;
        await Query.runWithParams(query, id);
    }
}

export default Flashcards;