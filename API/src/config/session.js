import { createRequire } from "module";
import session from "express-session";
import pool from "./db.js";

// Création de 'require' pour importer des modules CommonJS dans un contexte ES Module
const require = createRequire(import.meta.url);

// Importation du module 'express-mysql-session', qui permet de stocker les sessions dans une base de données MySQL
const MySQLStore = require("express-mysql-session")(session);

// Configuration du store MySQL pour gérer les sessions, en se basant sur le pool de connexions MySQL
const sessionStore = new MySQLStore(
    {
        clearExpired: true,
        checkExpirationInterval: 900000,
        expiration: 3600000,
    },
    pool // Le pool de connexions MySQL utilisé pour interagir avec la base de données
);

// Configuration des sessions avec express-session
const newSession = session({
    name: "sequence_id",
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        secure: false, // Le cookie n'est pas sécurisé (devrait être 'true' en production avec HTTPS)
        httpOnly: true, // Empêche l'accès au cookie via JavaScript côté client pour plus de sécurité
        sameSite: "lax", // Protection CSRF : le cookie est envoyé uniquement pour les requêtes de même site
        maxAge: 3600000,
    },
    rolling: true, // Réinitialise le délai d'expiration du cookie à chaque requête (prolonge la session active)
});

export default newSession;