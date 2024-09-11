import Users from "../model/Users.js";
import bcrypt from "bcrypt";

/**
 * Retrieves all users.
 * 
 * Retrieves all users from the database and sends a JSON response
 * with the retrieved users.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAllUsers = async (req, res) => {
    try {
        const response = await Users.getAllUsers();
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

/**
 * Retrieves a user by their ID.
 * 
 * Retrieves a user from the database based on the provided ID and sends a JSON response
 * with the retrieved user. If no user is found, responds with a 404 Not Found status.
 * 
 * @param {Object} req - The request object containing the user ID in params.
 * @param {Object} res - The response object.
 */
const getByIdUsers = async (req, res) => {
    try {
        const [response] = await Users.getByIdUsers(req.params.id);
        if (!response)
            return res.status(404).json({ message: "User not found" });
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

/**
 * Retrieves a user by their email.
 * 
 * Retrieves a user from the database based on the provided email and sends a JSON response
 * with the retrieved user. If no user is found, responds with a 404 Not Found status.
 * 
 * @param {Object} req - The request object containing the user email in body.
 * @param {Object} res - The response object.
 */
const getByEmailUsers = async (req, res) => {
    try {
        const response = await Users.getByEmailUsers({ email: req.body.email });
        if (response.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(response[0]);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

/**
 * Updates a user.
 * 
 * Updates an existing user in the database based on the provided ID and new data,
 * including hashing the password, and sends a JSON response with a success message.
 * If no user is found to update, responds with a 404 Not Found status.
 * 
 * @param {Object} req - The request object containing the user ID in params and updated data in body.
 * @param {Object} res - The response object.
 */
const updateUsers = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try {
        const modifUser = {
            ...req.body,
            id: req.params.id,
            password: hashedPassword
        }
        const response = await Users.updateUsers(modifUser);
        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

/**
 * Removes a user.
 * 
 * Removes a user from the database based on the provided ID and sends a JSON response
 * with a success message indicating the user was successfully deleted.
 * 
 * @param {Object} req - The request object containing the user ID in params.
 * @param {Object} res - The response object.
 */
const removeUsers = async (req, res) => {
    try {
        await Users.removeUsers(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export { getAllUsers, getByIdUsers, getByEmailUsers, updateUsers, removeUsers };