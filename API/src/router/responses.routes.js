import { Router } from "express";
import userRequired from "../middlewares/userRequired.js";
import { getAllResponses, getByIdResponses } from "../controllers/responses.js";

const router = Router();

// Route pour obtenir toutes les réponses
router.get("/", userRequired, getAllResponses);

// Route pour obtenir une réponse spécifique par son ID
router.get("/:id", userRequired, getByIdResponses);

export default router;