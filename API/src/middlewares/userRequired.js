// Middleware pour vérifier si l'utilisateur est connecté
export default (req, res, next) => {
    // Vérifie si l'utilisateur est connecté en examinant la présence d'une session utilisateur
    if (!req.session.user) {
        // Si l'utilisateur n'est pas connecté, renvoie une réponse avec un statut 403 et un message d'erreur
        res.status(403).json({ message: "You must be logged in to perform this action!" });
        return; // Interrompt l'exécution du middleware et la réponse est envoyée
    }

    // Si l'utilisateur est connecté, passe au middleware suivant dans la chaîne
    next();
}