/**
 * Middleware to check if the user is logged in.
 * 
 * This middleware checks if the user is authenticated through session.
 * If the user is not logged in, it sends a 403 Forbidden response with an appropriate message.
 * Otherwise, it allows the request to proceed to the next middleware or route handler.
 * 
 * @param {Object} req - The request object, containing session information.
 * @param {Object} res - The response object, used to send a response if the user is not logged in.
 * @param {Function} next - The next middleware or route handler to be executed if the user is logged in.
 */
export default (req, res, next) => {
    if (!req.session.user) {
        res.status(403).json({ message: "You must be logged in to perform this action!" });
        return;
    }
    next();
}