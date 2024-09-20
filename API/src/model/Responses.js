import Query from "./Query.js";

class Responses {

    static async getAllResponses() {
        // Requête SQL pour récupérer toutes les réponses avec leurs séquences et flashcards associées
        const query = `
            SELECT
                responses.id, responses.mistake,
                sequences.res_date,
                flashcards.id
            FROM responses
            INNER JOIN sequences
                ON sequences.id = responses.sequence_id
            INNER JOIN flashcards
                ON flashcards.id = responses.flashcard_id
        `;
        // Exécution de la requête via la méthode Query.run
        const response = await Query.run(query);
        // Retour des résultats de la requête
        return response;
    }

    static async getByIdResponses(id) {
        // Requête SQL pour récupérer une réponse spécifique selon son ID
        const query = `
            SELECT
                responses.id, responses.mistake,
                sequences.res_date,
                flashcards.id
            FROM responses
            INNER JOIN sequences
                ON sequences.id = responses.sequence_id
            INNER JOIN flashcards
                ON flashcards.id = responses.flashcard_id
            WHERE responses.id = ?
        `;
        // Exécution de la requête avec un paramètre d'ID via la méthode Query.runWithParams
        const response = await Query.runWithParams(query, id);
        // Retour des résultats de la requête
        return response;
    }
}

export default Responses;