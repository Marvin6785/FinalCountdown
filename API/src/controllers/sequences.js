import Sequences from "../model/Sequences.js";

const getAllSequences = async (req, res) => {
    try {
        // Appel à la méthode du modèle pour récupérer toutes les séquences
        const response = await Sequences.getAllSequences();

        // Envoie des séquences récupérées avec un message de succès
        res.json({
            message: "Fetching all sequences from API route!",
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

const getByIdSequences = async (req, res) => {
    try {
        // Récupère l'ID depuis les paramètres de la requête et appelle la méthode du modèle pour trouver la séquence
        const [response] = await Sequences.getByIdSequences(req.params.id);

        // Si la séquence n'est pas trouvée, renvoie une réponse 404 (non trouvée)
        if (!response)
            return res.status(404).json({ message: "Sequence not found" });

        // Si la séquence est trouvée, renvoie ses données
        res.json(response);
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

const addSequences = async (req, res) => {
    try {    
        // Crée une nouvelle séquence en utilisant la méthode du modèle
        const response = await Sequences.addSequences();

        // Si l'ajout est réussi, envoie un message de succès avec les détails de la séquence ajoutée
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

const updateSequences = async (req, res) => {
    try {
        // Récupère l'ID de la séquence depuis les paramètres de la requête
        const { id } = req.params;
        
        // Crée un objet contenant les données mises à jour de la séquence
        const data = {
            ...req.body,
            id,
        }

        const response = await Sequences.updateSequences(data);

        // Envoie un message de succès avec les détails de la séquence mise à jour
        res.json({ message: "Data updated successfully!", response });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

const removeSequences = async (req, res) => {
    try {
        await Sequences.removeSequences(req.params.id);

        res.json({ message: "Sequence deleted successfully!" });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

export { getAllSequences, getByIdSequences, addSequences, updateSequences, removeSequences };