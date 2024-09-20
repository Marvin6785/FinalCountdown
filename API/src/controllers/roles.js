import Roles from "../model/Roles.js";

const getAllRoles = async (req, res) => {
    try {
        // Appel à la méthode du modèle pour récupérer tous les rôles
        const response = await Roles.getAllRoles();

        // Envoie des rôles récupérés avec un message de succès
        res.json({
            message: "Fetching all roles from API route!",
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

const getByIdRoles = async (req, res) => {
    try {
        // Récupère l'ID depuis les paramètres de la requête et appelle la méthode du modèle pour trouver le rôle
        const [response] = await Roles.getByIdRoles(req.params.id);

        // Si le rôle n'est pas trouvé, renvoie une réponse 404 (non trouvé)
        if (!response)
            return res.status(404).json({ message: "Role not found" });

        // Si le rôle est trouvé, renvoie ses données
        res.json(response);
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

const addRoles = async (req, res) => {
    try {
        // Crée un objet contenant les données du nouveau rôle issues du corps de la requête
        const newRole = {
            ...req.body
        }

        const response = await Roles.addRoles(newRole);

        if (response) {
            res.json({
                message: "Role added successfully!",
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

const updateRoles = async (req, res) => {
    try {
        // Récupère l'ID du rôle depuis les paramètres de la requête
        const { id } = req.params;
        
        const data = {
            ...req.body,
            id,
        }

        const response = await Roles.updateRoles(data);

        res.json({ 
            message: "Role updated successfully!", 
            response 
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

const removeRoles = async (req, res) => {
    try {
        await Roles.removeRoles(req.params.id);

        res.json({ message: "Role deleted successfully!" });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

export { getAllRoles, getByIdRoles, addRoles, updateRoles, removeRoles };