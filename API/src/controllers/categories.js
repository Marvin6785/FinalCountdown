import Categories from "../model/Categories.js";

const getAllCategories = async (req, res) => {
    try {
        // Appel à la méthode du modèle pour récupérer toutes les catégories
        const response = await Categories.getAllCategories();
        
        // Envoie des catégories en réponse avec un message de succès
        res.json({
            message: "Fetching all categories from API route!",
            response,
        });
    } catch (error) {
        // En cas d'erreur serveur, envoie une réponse avec un statut 500 et le message d'erreur
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
}

const getByIdCategories = async (req, res) => {
    try {
        // Récupère la catégorie par rapport à son ID transmis en paramètre sur la route
        const [response] = await Categories.getByIdCategories(req.params.id); // getCategoryById
        
        if (!response)
            return res.status(404).json({ message: "Category not found",});
        // Si la catégorie est trouvée, renvoie ses données
        res.json(response);
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

const addCategories = async (req, res) => {
    const { language } = req.body; // Récupère le langage de la catégorie depuis le corps de la requête

    try {
        const response = await Categories.addCategories(language);
        
        // Envoie un message de succès avec la réponse contenant les détails de la catégorie ajoutée
        res.json({ 
            message: "Category successfully added",
            response,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error", 
            error: error.message, 
        });
    }
}

const updateCategories = async (req, res) => {
    try {
        const { id } = req.params; // Récupère l'ID de la catégorie depuis les paramètres de la requête
        const data = {
            ...req.body, // Récupère les nouvelles données de la catégorie depuis le corps de la requête
            id, // Ajoute l'ID de la catégorie
        }
        
        const response = await Categories.updateCategories(data);
        
        res.json({ 
            message: "Category successfully updated!", 
            response 
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

const removeCategories = async (req, res) => {
    try {
        await Categories.removeCategories(req.params.id);
        
        res.json({ message: "Category successfully deleted!" });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

export { getAllCategories, getByIdCategories, addCategories, updateCategories, removeCategories };