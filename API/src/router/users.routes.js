import { Router } from "express";
import { 
    getAllUsers,
    updateUsers,
    removeUsers
} from "../controllers/users.js";
import adminRequired from "../middlewares/adminRequired.js";
import userRequired from "../middlewares/userRequired.js";

const router = Router();

// Route pour obtenir tous les utilisateurs
router.get("/", adminRequired, getAllUsers);

// Route pour mettre à jour les informations d'un utilisateur
router.patch("/:id", userRequired, updateUsers);

// Route pour supprimer un utilisateur par son ID
router.delete("/:id", userRequired, removeUsers);

export default router;