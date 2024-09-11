import Responses from "../model/Responses.js";

/**
 * Retrieves all responses.
 * 
 * Retrieves all responses from the database and sends a JSON response
 * with a success message and the retrieved responses.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAllResponses = async (req, res) => {
    try {        
        const response = await Responses.getAllResponses();

        res.json({
            message: "Fetching all responses from API route!",
            response,
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

/**
 * Retrieves a response by its ID.
 * 
 * Retrieves a response from the database based on the provided ID and sends a JSON response
 * with the retrieved response. If no response is found, responds with a 404 Not Found status.
 * 
 * @param {Object} req - The request object containing the response ID in params.
 * @param {Object} res - The response object.
 */
const getByIdResponses = async (req, res) => {
    try {        
        const [response] = await Responses.getByIdResponses(req.params.id);
        if (!response)
            return res.status(404).json({ message: "Response not found" });
        res.json(response);
        
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

export { getAllResponses, getByIdResponses };