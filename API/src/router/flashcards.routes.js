import { Router } from "express";

import { 
    getAllFlashcards, 
    getByIdFlashcards, 
    addFlashcards, 
    updateFlashcards, 
    removeFlashcards 
} from "../controllers/flashcards.js";

import adminRequired from "../middlewares/adminRequired.js";

const router = Router();

/**
 * GET /flashcards
 * Retrieves all flashcards.
 * 
 * Fetches all existing flashcards from the database.
 * Responds with an array of flashcards.
 */
router.get("/", getAllFlashcards);

/**
 * GET /flashcards/:id
 * Retrieves a specific flashcard by ID.
 * 
 * Fetches a flashcard from the database based on the provided ID parameter.
 * Responds with the flashcard object if found.
 * Responds with a 404 Not Found status if no flashcard with the ID exists.
 */
router.get("/:id", getByIdFlashcards);

/**
 * POST /flashcards
 * Creates a new flashcard.
 * 
 * Requires admin authentication to access.
 * Adds a new flashcard to the database with the provided details.
 * Responds with a success message upon successful creation.
 * Responds with a 403 Forbidden status if the user is not an admin.
 * Responds with a 500 Internal Server Error status for server-side errors.
 */
router.post("/", adminRequired, addFlashcards);

/**
 * PATCH /flashcards/:id
 * Updates an existing flashcard.
 * 
 * Requires admin authentication to access.
 * Updates the details of an existing flashcard based on the provided ID parameter.
 * Responds with a success message upon successful update.
 * Responds with a 403 Forbidden status if the user is not an admin.
 * Responds with a 500 Internal Server Error status for server-side errors.
 */
router.patch("/:id", adminRequired, updateFlashcards);

/**
 * DELETE /flashcards/:id
 * Deletes an existing flashcard.
 * 
 * Requires admin authentication to access.
 * Deletes a flashcard from the database based on the provided ID parameter.
 * Responds with a success message upon successful deletion.
 * Responds with a 403 Forbidden status if the user is not an admin.
 * Responds with a 500 Internal Server Error status for server-side errors.
 */
router.delete("/:id", adminRequired, removeFlashcards);

export default router;