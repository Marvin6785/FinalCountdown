import { Router } from "express";

import { 
    getAllCategories, 
    addCategories, 
    getByIdCategories, 
    updateCategories, 
    removeCategories 
} from "../controllers/categories.js";

import adminRequired from "../middlewares/adminRequired.js";

const router = Router();

/**
 * GET /categories
 * Retrieves all categories.
 * 
 * Fetches all existing categories from the database.
 * Responds with an array of categories.
 */
router.get("/", getAllCategories);

/**
 * GET /categories/:id
 * Retrieves a specific category by ID.
 * 
 * Fetches a category from the database based on the provided ID parameter.
 * Responds with the category object if found.
 * Responds with a 404 Not Found status if no category with the ID exists.
 */
router.get("/:id", getByIdCategories);

/**
 * POST /categories
 * Creates a new category.
 * 
 * Requires admin authentication to access.
 * Adds a new category to the database with the provided details.
 * Responds with a success message upon successful creation.
 * Responds with a 403 Forbidden status if the user is not an admin.
 * Responds with a 500 Internal Server Error status for server-side errors.
 */
router.post("/", adminRequired, addCategories);

/**
 * PATCH /categories/:id
 * Updates an existing category.
 * 
 * Requires admin authentication to access.
 * Updates the details of an existing category based on the provided ID parameter.
 * Responds with a success message upon successful update.
 * Responds with a 403 Forbidden status if the user is not an admin.
 * Responds with a 500 Internal Server Error status for server-side errors.
 */
router.patch("/:id", adminRequired, updateCategories);

/**
 * DELETE /categories/:id
 * Deletes an existing category.
 * 
 * Requires admin authentication to access.
 * Deletes a category from the database based on the provided ID parameter.
 * Responds with a success message upon successful deletion.
 * Responds with a 403 Forbidden status if the user is not an admin.
 * Responds with a 500 Internal Server Error status for server-side errors.
 */
router.delete("/:id", adminRequired, removeCategories);

export default router;