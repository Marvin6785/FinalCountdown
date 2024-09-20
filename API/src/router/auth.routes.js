import { Router } from "express";
import userRequired from "../middlewares/userRequired.js";
import { checkAuth, register, login, logout } from "../controllers/auth.js";

// Crée une nouvelle instance du routeur express
const router = Router();

// Route pour vérifier si l'utilisateur est authentifié
router.get("/", userRequired, checkAuth);

// Route pour l'inscription d'un nouvel utilisateur
router.post("/register", register);

// Route pour la connexion d'un utilisateur existant
router.post("/login", login);

// Route pour déconnecter l'utilisateur, nécessite qu'il soit connecté (middleware userRequired)
router.get("/logout", userRequired, logout);

// Exporte le routeur pour l'utiliser ailleurs
export default router;