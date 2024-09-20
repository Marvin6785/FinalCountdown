import { Router } from "express";
import adminRequired from "../middlewares/adminRequired.js";
import { 
    getAllRoles, 
    getByIdRoles, 
    addRoles, 
    updateRoles, 
    removeRoles 
} from "../controllers/roles.js";

const router = Router();

// Route pour obtenir tous les rôles
router.get("/", getAllRoles);

// Route pour obtenir un rôle spécifique par son ID
router.get("/:id", getByIdRoles);

// Route pour ajouter un nouveau rôle
router.post("/", addRoles);

// Route pour mettre à jour un rôle existant par son ID
router.patch("/:id", updateRoles);

// Route pour supprimer un rôle par son ID
router.delete("/:id", removeRoles);

export default router;