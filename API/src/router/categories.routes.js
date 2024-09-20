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

// Route pour obtenir toutes les catégories
router.get("/", getAllCategories);

// Route pour obtenir une catégorie par son ID
router.get("/:id", getByIdCategories);

// Route pour ajouter une nouvelle catégorie
router.post("/", adminRequired, addCategories);

// Route pour mettre à jour une catégorie existante
router.patch("/:id", adminRequired, updateCategories);

// Route pour supprimer une catégorie par son ID
router.delete("/:id", adminRequired, removeCategories);

export default router;