// Middleware de vérification des autorisations pour les actions réservées aux administrateurs
export default (req, res, next) => {

    // Vérifie si l'utilisateur est connecté et s'il a un rôle d'administrateur
    if (!req.session.user || req.session.user.isAdmin !== 1) {
        // Si l'utilisateur n'est pas connecté ou n'est pas un administrateur, renvoie une réponse 403
        res.status(403).json({ message: "Vous n'êtes pas autorisé à effectuer cette action !" });
        return; // Interrompt l'exécution du middleware et la réponse est envoyée
    }

    // Si l'utilisateur est un administrateur, passe au middleware suivant dans la chaîne
    if (req.session.user.isAdmin === 1) {
        next();
    }
}