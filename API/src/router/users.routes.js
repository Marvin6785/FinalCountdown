import { Router } from "express";
import { 
    getAllUsers,
    getByIdUsers,
    getByEmailUsers,
    updateUsers,
    removeUsers
} from "../controllers/users.js";
import adminRequired from "../middlewares/adminRequired.js";
import userRequired from "../middlewares/userRequired.js";

const router = Router();

/**
 * GET /api/v1/users
 * Endpoint to retrieve all users.
 * 
 * Uses adminRequired middleware to ensure only admins can access this endpoint.
 * Uses getAllUsers controller function to fetch all users from the database.
 */
router.get("/", adminRequired, getAllUsers);

/**
 * GET /api/v1/users/:id
 * Endpoint to retrieve a user by their ID.
 * 
 * Uses adminRequired middleware to ensure only admins can access this endpoint.
 * Uses getByIdUsers controller function to fetch a specific user by their ID from the database.
 */
router.get("/:id", adminRequired, getByIdUsers);

/**
 * POST /api/v1/users/findUserByEmail
 * Endpoint to find a user by their email.
 * 
 * Uses adminRequired middleware to ensure only admins can access this endpoint.
 * Uses getByEmailUsers controller function to find a user by their email in the database.
 */
router.post("/findUserByEmail", adminRequired, getByEmailUsers);

/**
 * PUT /api/v1/users/:id
 * Endpoint to update a user by their ID.
 * 
 * Uses userRequired middleware to ensure the authenticated user can access this endpoint.
 * Uses updateUsers controller function to update a user's information in the database.
 */
router.put("/:id", userRequired, updateUsers);

/**
 * DELETE /api/v1/users/:id
 * Endpoint to remove a user by their ID.
 * 
 * Uses userRequired middleware to ensure the authenticated user can access this endpoint.
 * Uses removeUsers controller function to delete a user from the database.
 */
router.delete("/:id", userRequired, removeUsers);

export default router;