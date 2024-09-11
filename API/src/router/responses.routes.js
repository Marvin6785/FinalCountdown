import { Router } from "express";
import { getAllResponses, getByIdResponses } from "../controllers/responses.js";

const router = Router();

/**
 * GET /api/v1/resp
 * Endpoint to retrieve all responses.
 * 
 * Uses the getAllResponses controller function to fetch all responses from the database.
 */
router.get("/", getAllResponses);

/**
 * GET /api/v1/resp/:id
 * Endpoint to retrieve a response by its ID.
 * 
 * Uses the getByIdResponses controller function to fetch a specific response by its ID from the database.
 * If the response with the specified ID does not exist, returns a 404 Not Found error.
 */
router.get("/:id", getByIdResponses);

export default router;