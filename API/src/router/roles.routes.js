import { Router } from "express";
import { 
    getAllRoles, 
    getByIdRoles, 
    addRoles, 
    updateRoles, 
    removeRoles 
} from "../controllers/roles.js";
import adminRequired from "../middlewares/adminRequired.js";

const router = Router();

/**
 * GET /api/v1/roles
 * Endpoint to retrieve all roles.
 * 
 * Uses adminRequired middleware to ensure only admins can access the endpoint.
 * Uses getAllRoles controller function to fetch all roles from the database.
 */
router.get("/", adminRequired, getAllRoles);

/**
 * GET /api/v1/roles/:id
 * Endpoint to retrieve a role by its ID.
 * 
 * Uses getByIdRoles controller function to fetch a specific role by its ID from the database.
 * If the role with the specified ID does not exist, responds with a 404 Not Found error.
 */
router.get("/:id", getByIdRoles);

/**
 * POST /api/v1/roles
 * Endpoint to add a new role.
 * 
 * Uses addRoles controller function to add a new role to the database.
 */
router.post("/", addRoles);

/**
 * PATCH /api/v1/roles/:id
 * Endpoint to update a role by its ID.
 * 
 * Uses updateRoles controller function to update an existing role in the database.
 */
router.patch("/:id", updateRoles);

/**
 * DELETE /api/v1/roles/:id
 * Endpoint to remove a role by its ID.
 * 
 * Uses removeRoles controller function to delete a role from the database.
 */
router.delete("/:id", removeRoles);

export default router;