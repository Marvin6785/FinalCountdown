import Flashcards from "../model/Flashcards.js";

const getAllFlashcards = async (req, res) => {
    try {        
        // Appel à la méthode du modèle pour récupérer toutes les flashcards
        const response = await Flashcards.getAllFlashcards();

        // Envoie des flashcards récupérées avec un message de succès
        res.json({
            message: "Fetching all flashcards from API route!",
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

const getByIdFlashcards = async (req, res) => {
    try {        
        // Récupère l'ID depuis les paramètres de la requête et appelle la méthode du modèle pour trouver la flashcard
        const [response] = await Flashcards.getByIdFlashcards(req.params.id);

        // Si la flashcard n'est pas trouvée, renvoie une réponse 404 (non trouvée)
        if (!response)
            return res.status(404).json({ message: "Flashcard not found" });

        // Si la flashcard est trouvée, renvoie ses données
        res.json(response);
        
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

const addFlashcards = async (req, res) => {
    try {
        // Récupère les données de la flashcard depuis le corps de la requête
        const flashcards = {
            ...req.body
        }           

        const response = await Flashcards.addFlashcards(flashcards);

        if (response) {
            res.json({
                message: "Data inserted successfully!",
                response,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

const updateFlashcards = async (req, res) => {
    try {
        const { id } = req.params;

        // Récupère les nouvelles données de la flashcard depuis le corps de la requête
        const data = {
            ...req.body,
            id, // Ajoute l'ID pour identifier la flashcard à mettre à jour
        }

        // Appel à la méthode du modèle pour mettre à jour la flashcard
        const response = await Flashcards.updateFlashcards(data);

        res.json({ 
            message: "Data updated successfully!", 
            response 
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

const removeFlashcards = async (req, res) => {
    try {
        await Flashcards.removeFlashcards(req.params.id);

        res.json({ message: "Flashcard deleted successfully!" });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

export { getAllFlashcards, getByIdFlashcards, addFlashcards, updateFlashcards, removeFlashcards };