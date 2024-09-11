import { Router } from "express";
import { 
    getAllSequences, 
    getByIdSequences, 
    addSequences, 
    updateSequences, 
    removeSequences 
} from "../controllers/sequences.js";
import adminRequired from "../middlewares/adminRequired.js";

const router = Router();

/**
 * GET /api/v1/sequences
 * Endpoint to retrieve all sequences.
 * 
 * Uses getAllSequences controller function to fetch all sequences from the database.
 */
router.get("/", getAllSequences);

/**
 * GET /api/v1/sequences/:id
 * Endpoint to retrieve a sequence by its ID.
 * 
 * Uses getByIdSequences controller function to fetch a specific sequence by its ID from the database.
 * If the sequence with the specified ID does not exist, responds with a 404 Not Found error.
 */
router.get("/:id", getByIdSequences);

/**
 * POST /api/v1/sequences
 * Endpoint to add a new sequence.
 * 
 * Uses adminRequired middleware to ensure only admins can access this endpoint.
 * Uses addSequences controller function to add a new sequence to the database.
 */
router.post("/", adminRequired, addSequences);

/**
 * PATCH /api/v1/sequences/:id
 * Endpoint to update a sequence by its ID.
 * 
 * Uses adminRequired middleware to ensure only admins can access this endpoint.
 * Uses updateSequences controller function to update an existing sequence in the database.
 */
router.patch("/:id", adminRequired, updateSequences);

/**
 * DELETE /api/v1/sequences/:id
 * Endpoint to remove a sequence by its ID.
 * 
 * Uses adminRequired middleware to ensure only admins can access this endpoint.
 * Uses removeSequences controller function to delete a sequence from the database.
 */
router.delete("/:id", adminRequired, removeSequences);

export default router;