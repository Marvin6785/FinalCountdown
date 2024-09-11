import Flashcards from "../model/Flashcards.js";
// import upload from "../config/multer.js";

/**
 * Retrieves all flashcards.
 * 
 * Retrieves all flashcards from the database and sends a JSON response
 * with a success message and the retrieved flashcards.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAllFlashcards = async (req, res) => {
    try {        
        const response = await Flashcards.getAllFlashcards();

        res.json({
            message: "Fetching all flashcards from API route!",
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
 * Retrieves a flashcard by its ID.
 * 
 * Retrieves a flashcard from the database based on the provided ID and sends a JSON response
 * with the retrieved flashcard. If no flashcard is found, responds with a 404 Not Found status.
 * 
 * @param {Object} req - The request object containing the flashcard ID in params.
 * @param {Object} res - The response object.
 */
const getByIdFlashcards = async (req, res) => {
    try {        
        const [response] = await Flashcards.getByIdFlashcards(req.params.id);
        if (!response)
            return res.status(404).json({ message: "Flashcard not found" });
        res.json(response);
        
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

/**
 * Adds a new flashcard.
 * 
 * Adds a new flashcard to the database based on the provided data and sends a JSON response
 * with a success message and the newly added flashcard details.
 * 
 * @param {Object} req - The request object containing the flashcard data in body.
 * @param {Object} res - The response object.
 */
const addFlashcards = async (req, res) => {
    try {
        // upload(req, res, async function (error) {
        //     if (error) {
        //         return res.status(400).json({ message: error });
        //     } 
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
        // });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

/**
 * Updates a flashcard.
 * 
 * Updates an existing flashcard in the database based on the provided ID and new data,
 * and sends a JSON response with a success message and the updated flashcard details.
 * 
 * @param {Object} req - The request object containing the flashcard ID in params and updated data in body.
 * @param {Object} res - The response object.
 */
const updateFlashcards = async (req, res) => {
    try {
        const { id } = req.params;
        const data = {
            ...req.body,
            id,
        }
        const response = await Flashcards.updateFlashcards(data);
        res.json({ message: "Data updated successfully!", response});
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

/**
 * Removes a flashcard.
 * 
 * Removes a flashcard from the database based on the provided ID and sends a JSON response
 * with a success message indicating the flashcard was successfully deleted.
 * 
 * @param {Object} req - The request object containing the flashcard ID in params.
 * @param {Object} res - The response object.
 */
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