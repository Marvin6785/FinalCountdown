import Responses from "../model/Responses.js";

const getAllResponses = async (req, res) => {
    try {
        // Appel à la méthode du modèle pour récupérer toutes les réponses
        const response = await Responses.getAllResponses();

        // Envoie des réponses récupérées avec un message de succès
        res.json({
            message: "Fetching all responses from API route!",
            response,
        });
        
    } catch (error) {
        // En cas d'erreur serveur, envoie une réponse avec un statut 500 et le message d'erreur
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

const getByIdResponses = async (req, res) => {
    try {
        // Récupère l'ID depuis les paramètres de la requête et appelle la méthode du modèle pour trouver la réponse
        const [response] = await Responses.getByIdResponses(req.params.id);

        // Si la réponse n'est pas trouvée, renvoie une réponse 404 (non trouvée)
        if (!response)
            return res.status(404).json({ message: "Response not found" });

        // Si la réponse est trouvée, renvoie ses données
        res.json(response);
        
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

export { getAllResponses, getByIdResponses };