import { Router } from "express";
import auth_router from "./auth.routes.js";
import categories_router from "./categories.routes.js";
import flashcards_router from "./flashcards.routes.js";
import responses_router from "./responses.routes.js";
import users_router from "./users.routes.js";
import roles_router from "./roles.routes.js";
import adminRequired from "../middlewares/adminRequired.js";
import userRequired from "../middlewares/userRequired.js";

const router = Router();
const BASE_API = "/api/v1";

// Route racine pour vérifier la connexion à l'API
router.get("/", (req, res) => {
    res.json({ msg: "connected to the API" });
});

// Routes pour les opérations d'authentification
router.use(`${BASE_API}/auth`, auth_router);

// Routes pour gérer les catégories
router.use(`${BASE_API}/categories`, userRequired, categories_router);

// Routes pour gérer les flashcards
router.use(`${BASE_API}/flashcards`, userRequired, flashcards_router);

// Routes pour gérer les réponses
router.use(`${BASE_API}/resp`, userRequired, responses_router);

// Routes pour gérer les rôles
router.use(`${BASE_API}/roles`, adminRequired, roles_router);

// Routes pour gérer les utilisateurs
router.use(`${BASE_API}/users`, users_router);

export default router;