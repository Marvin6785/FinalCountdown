import { Router } from "express";

import auth_router from "./auth.routes.js";
import categories_router from "./categories.routes.js";
import flashcards_router from "./flashcards.routes.js";
import responses_router from "./responses.routes.js";
import users_router from "./users.routes.js";
import roles_router from "./roles.routes.js";

const router = Router();
const BASE_API = "/api/v1";

/**
 * GET /
 * Root endpoint of the API.
 * 
 * Responds with a JSON message indicating successful connection.
 */
router.get("/", (req, res) => {
    res.json({msg: "connected to the API"});
});

/**
 * Routes for authentication-related operations.
 */
router.use(`${BASE_API}/auth`, auth_router);

/**
 * Routes for categories-related operations.
 */
router.use(`${BASE_API}/categories`, categories_router);

/**
 * Routes for flashcards-related operations.
 */
router.use(`${BASE_API}/flashcards`, flashcards_router);

/**
 * Routes for responses-related operations.
 */
router.use(`${BASE_API}/resp`, responses_router);

/**
 * Routes for roles-related operations.
 */
router.use(`${BASE_API}/roles`, roles_router);

/**
 * Routes for users-related operations.
 */
router.use(`${BASE_API}/users`, users_router);

export default router;