import { Router } from "express";
import userRequired from "../middlewares/userRequired.js";
import { checkAuth, register, login, logout } from "../controllers/auth.js";

const router = Router();

/**
 * GET /
 * Check if user is authenticated.
 * 
 * Middleware function to check if there is an authenticated user session.
 * Responds with a 403 Forbidden status if no authenticated user is found.
 */
router.get("/", checkAuth);

/**
 * POST /register
 * User registration endpoint.
 * 
 * Registers a new user with the provided details (nickname, email, password).
 * Responds with a success message upon successful registration.
 * Responds with a 409 Conflict status if the user already exists.
 * Responds with a 500 Internal Server Error status for server-side errors.
 */
router.post("/register", register);

/**
 * POST /login
 * User login endpoint.
 * 
 * Logs in a user with the provided email and password.
 * Sets the user session upon successful login.
 * Responds with a success message and user details upon successful login.
 * Responds with a 401 Unauthorized status if login credentials are incorrect.
 * Responds with a 500 Internal Server Error status for server-side errors.
 */
router.post("/login", login);

/**
 * GET /logout
 * User logout endpoint.
 * 
 * Logs out the currently authenticated user by destroying the session.
 * Requires user authentication before allowing access.
 * Responds with a success message upon successful logout.
 * Responds with a 500 Internal Server Error status for server-side errors.
 */
router.get("/logout", userRequired, logout);

export default router;