import { Router } from "express";
import { 
    getAllSequences, 
    getByIdSequences, 
    addSequences, 
    updateSequences, 
    removeSequences 
} from "../controllers/sequences.js";

const router = Router();

// Route pour obtenir toutes les séquences
router.get("/", getAllSequences);

// Route pour obtenir une séquence spécifique par son ID
router.get("/:id", getByIdSequences);

// Route pour ajouter une nouvelle séquence
router.post("/", addSequences);

// Route pour mettre à jour une séquence existante
router.patch("/:id", updateSequences);

// Route pour supprimer une séquence par son ID
router.delete("/:id", removeSequences);

export default router;