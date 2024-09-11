/**
 * Middleware to check if the user is an admin.
 * 
 * This middleware function verifies if the user is authenticated and has admin privileges.
 * If the user is not authenticated or not an admin, it sends a 403 Forbidden response.
 * Otherwise, it allows the request to proceed to the next middleware or route handler.
 * 
 * @param {Object} req - The request object, containing session information.
 * @param {Object} res - The response object, used to send a response if the user is not authorized.
 * @param {Function} next - The next middleware or route handler to be executed if the user is authorized.
 */
export default (req, res, next) => {
    if (!req.session.user || !req.session.user.isAdmin) {
        res.status(403).json({ message: "Vous n'êtes pas autorisé à effectuer cette action !" });
        return;
    }
    next();
}