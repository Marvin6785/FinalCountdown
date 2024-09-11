import Categories from "../model/Categories.js";

/**
 * Retrieves all categories.
 * 
 * Retrieves all categories from the database and sends a JSON response
 * with a success message and the retrieved categories.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAllCategories = async (req, res) => {
    try {
        const response = await Categories.getAllCategories();

        res.json({
            message: "Fetching all categories from API route!",
            response,
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
}

/**
 * Retrieves a category by its ID.
 * 
 * Retrieves a category from the database based on the provided ID and sends a JSON response
 * with the retrieved category. If no category is found, responds with a 404 Not Found status.
 * 
 * @param {Object} req - The request object containing the category ID in params.
 * @param {Object} res - The response object.
 */
const getByIdCategories = async (req, res) => {
    try {
        const [response] = await Categories.getByIdCategories(req.params.id);
        if (!response)
            return res.status(404).json({ 
                message: "Category not found",
            });
        res.json(response);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

/**
 * Adds a new category.
 * 
 * Adds a new category to the database based on the provided language and sends a JSON response
 * with a success message and the newly added category details.
 * 
 * @param {Object} req - The request object containing the category language in body.
 * @param {Object} res - The response object.
 */
const addCategories = async (req, res) => {
    const { language } = req.body;

    try {
        const response = await Categories.addCategories(language);
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

/**
 * Updates a category.
 * 
 * Updates an existing category in the database based on the provided ID and new data,
 * and sends a JSON response with a success message and the updated category details.
 * 
 * @param {Object} req - The request object containing the category ID in params and updated data in body.
 * @param {Object} res - The response object.
 */
const updateCategories = async (req, res) => {
    try {
        const { id } = req.params;
        const data = {
            ...req.body,
            id,
        }
        const response = await Categories.updateCategories(data);
        res.json({ message: "Category successfully updated!", response });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

/**
 * Removes a category.
 * 
 * Removes a category from the database based on the provided ID and sends a JSON response
 * with a success message indicating the category was successfully deleted.
 * 
 * @param {Object} req - The request object containing the category ID in params.
 * @param {Object} res - The response object.
 */
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