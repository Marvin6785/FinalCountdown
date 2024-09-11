import Roles from "../model/Roles.js";

/**
 * Retrieves all roles.
 * 
 * Retrieves all roles from the database and sends a JSON response
 * with a success message and the retrieved roles.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAllRoles = async (req, res) => {
    try {
        const response = await Roles.getAllRoles();

        res.json({
            message: "Fetching all roles from API route!",
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
 * Retrieves a role by its ID.
 * 
 * Retrieves a role from the database based on the provided ID and sends a JSON response
 * with the retrieved role. If no role is found, responds with a 404 Not Found status.
 * 
 * @param {Object} req - The request object containing the role ID in params.
 * @param {Object} res - The response object.
 */
const getByIdRoles = async (req, res) => {
    try {
        const [response] = await Roles.getByIdRoles(req.params.id);
        if (!response)
            return res.status(404).json({ message: "Role not found" });
        res.json(response);
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

/**
 * Adds a new role.
 * 
 * Adds a new role to the database based on the provided data and sends a JSON response
 * with a success message and the newly added role details.
 * 
 * @param {Object} req - The request object containing the role data in body.
 * @param {Object} res - The response object.
 */
const addRoles = async (req, res) => {
    try {
        const newRole = {
            ...req.body
        }
        const response = await Roles.addRoles(newRole);

        if (response) {
            res.json({
                message: "Role added successfully!",
                response,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

/**
 * Updates a role.
 * 
 * Updates an existing role in the database based on the provided ID and new data,
 * and sends a JSON response with a success message and the updated role details.
 * 
 * @param {Object} req - The request object containing the role ID in params and updated data in body.
 * @param {Object} res - The response object.
 */
const updateRoles = async (req, res) => {
    try {
        const { id } = req.params;
        
        const data = {
            ...req.body,
            id,
        }
        const response = await Roles.updateRoles(data);
        res.json({ message: "Role updated successfully!", response});
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

/**
 * Removes a role.
 * 
 * Removes a role from the database based on the provided ID and sends a JSON response
 * with a success message indicating the role was successfully deleted.
 * 
 * @param {Object} req - The request object containing the role ID in params.
 * @param {Object} res - The response object.
 */
const removeRoles = async (req, res) => {
    try {
        await Roles.removeRoles(req.params.id);
        res.json({ message: "Role deleted successfully!" });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

export { getAllRoles, getByIdRoles, addRoles, updateRoles, removeRoles };