import Users from "../model/Users.js";
import bcrypt from "bcrypt";

const getAllUsers = async (req, res) => {
    try {
        // Appel à la méthode du modèle pour récupérer tous les utilisateurs
        const response = await Users.getAllUsers();

        // Envoie des données des utilisateurs récupérées
        res.json(response);
    } catch (error) {
        // En cas d'erreur serveur, envoie une réponse avec un statut 500 et le message d'erreur
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
}

const getByIdUsers = async (req, res) => {
    try {
        // Récupère l'ID depuis les paramètres de la requête et appelle la méthode du modèle pour trouver l'utilisateur
        const [response] = await Users.getByIdUsers(req.params);

        // Si l'utilisateur n'est pas trouvé, renvoie une réponse 404 (non trouvée)
        if (!response)
            return res.status(404).json({ message: "User not found" });

        // Si l'utilisateur est trouvé, renvoie ses données
        res.json(response);
    } catch (error) {
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
}

const getByEmailUsers = async (req, res) => {
    try {
        // Récupère l'utilisateur basé sur l'e-mail fourni dans le corps de la requête
        const response = await Users.getByEmailUsers({ email: req.body.email });

        if (response.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Si l'utilisateur est trouvé, renvoie les données du premier utilisateur
        res.json(response[0]);
    } catch (error) {
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
}

const updateUsers = async (req, res) => {
    try {
        // Hashage du mot de passe avant mise à jour
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Création d'un objet de mise à jour avec les nouvelles données et l'ID de l'utilisateur
        const modifUser = {
            ...req.body,
            id: req.params.id,
            password: hashedPassword
        }

        const response = await Users.updateUsers(modifUser);

        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Envoie un message de succès si la mise à jour est réussie
        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
}

const removeUsers = async (req, res) => {
    try {
        // Appel à la méthode du modèle pour supprimer l'utilisateur via son ID
        await Users.removeUsers(req.params.id);

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export { getAllUsers, getByIdUsers, getByEmailUsers, updateUsers, removeUsers };