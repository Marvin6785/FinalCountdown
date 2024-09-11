import Sequences from "../model/Sequences.js";

/**
 * Retrieves all sequences.
 * 
 * Retrieves all sequences from the database and sends a JSON response
 * with a success message and the retrieved sequences.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAllSequences = async (req, res) => {
    try {
        const response = await Sequences.getAllSequences();

        res.json({
            message: "Fetching all sequences from API route!",
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
 * Retrieves a sequence by its ID.
 * 
 * Retrieves a sequence from the database based on the provided ID and sends a JSON response
 * with the retrieved sequence. If no sequence is found, responds with a 404 Not Found status.
 * 
 * @param {Object} req - The request object containing the sequence ID in params.
 * @param {Object} res - The response object.
 */
const getByIdSequences = async (req, res) => {
    try {
        const [response] = await Sequences.getByIdSequences(req.params.id);
        if (!response)
            return res.status(404).json({ message: "Sequence not found" });
        res.json(response);
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

/**
 * Adds a new sequence.
 * 
 * Adds a new sequence to the database based on the provided data and sends a JSON response
 * with a success message and the newly added sequence details.
 * 
 * @param {Object} req - The request object containing the sequence data in body.
 * @param {Object} res - The response object.
 */
const addSequences = async (req, res) => {
    try {
        // upload(req, res, async function (error) {
        //     if (error) {
        //         return res.status(400).json({ message: error });
        //     }
            
            const response = await Sequences.addSequences();

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
 * Updates a sequence.
 * 
 * Updates an existing sequence in the database based on the provided ID and new data,
 * and sends a JSON response with a success message and the updated sequence details.
 * 
 * @param {Object} req - The request object containing the sequence ID in params and updated data in body.
 * @param {Object} res - The response object.
 */
const updateSequences = async (req, res) => {
    try {
        const { id } = req.params;
        
        const data = {
            ...req.body,
            id,
        }
        const response = await Sequences.updateSequences(data);
        res.json({ message: "Data updated successfully!", response});
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

/**
 * Removes a sequence.
 * 
 * Removes a sequence from the database based on the provided ID and sends a JSON response
 * with a success message indicating the sequence was successfully deleted.
 * 
 * @param {Object} req - The request object containing the sequence ID in params.
 * @param {Object} res - The response object.
 */
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