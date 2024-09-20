// Charge les variables d'environnement depuis le fichier .env
import "dotenv/config";
// Importation des modules express et cors pour gérer les requêtes HTTP et les politiques de partage des ressources
import express from "express";
import cors from "cors";
import router from "./router/index.routes.js";
import newSession from "./config/session.js";

const app = express();

// Configuration des options pour CORS (Cross-Origin Resource Sharing)
// Permet uniquement les requêtes provenant de http://localhost:5173
const corsOptions = cors({
	origin: "http://localhost:5173",
	credentials: true,
});

// Application des options CORS à toutes les requêtes
app.use(corsOptions);

// Application de la configuration de session à toutes les requêtes
app.use(newSession);

// Middleware pour analyser les corps des requêtes en JSON
app.use(express.json());

// Middleware pour servir des fichiers statiques depuis le répertoire "public"
app.use(express.static("public"));

// Utilisation des routes définies dans router/index.routes.js
app.use(router);

// Démarrage du serveur sur le port défini dans les variables d'environnement
app.listen(process.env.LOCAL_PORT, () => {
    console.log("Server is running at http://localhost:" + process.env.LOCAL_PORT);
});