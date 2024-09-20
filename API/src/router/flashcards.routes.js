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

// Route pour obtenir toutes les flashcards
router.get("/", getAllFlashcards);

// Route pour obtenir une flashcard par son ID
router.get("/:id", getByIdFlashcards);

// Route pour ajouter une nouvelle flashcard
router.post("/", adminRequired, addFlashcards);

// Route pour mettre à jour une flashcard existante
router.patch("/:id", adminRequired, updateFlashcards);

// Route pour supprimer une flashcard par son ID
router.delete("/:id", adminRequired, removeFlashcards);

export default router;