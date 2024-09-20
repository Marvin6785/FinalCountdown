import bcrypt from "bcrypt";
import Users from "../model/Users.js";

// Vérification de l'authentification de l'utilisateur
const checkAuth = (req, res) => {
    // Vérifie si une session utilisateur existe
    if(req.session.user){
        res.json({ 
            message: "User logged in", 
            user: req.session.user 
        });
    } else {
        res.status(401).json({ message: "User not logged in" });
    }
}

// Enregistrement d'un nouvel utilisateur
const register = async (req, res) => {
    try {
        // Vérifie si un utilisateur avec le même email existe déjà dans la base de données
        const existingUser = await Users.getByEmailUsers({ email: req.body.email });
        if (existingUser.length) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hashage du mot de passe avec bcrypt
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Création d'un nouvel objet utilisateur avec les données reçues
        const newUser = {
            nickname: req.body.nickname,
            email: req.body.email,
            password: hashedPassword
        }

        // Ajoute le nouvel utilisateur à la base de données
        await Users.addUsers(newUser);

        res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
}

// Connexion de l'utilisateur
const login = async (req, res) => {
    try {
        // Récupère l'utilisateur par email depuis la base de données
        const [user] = await Users.getByEmailUsers({ email: req.body.email });

        // Vérifie si l'utilisateur existe et si le mot de passe est correct
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(401).json({ message: "Incorrect credentials" });
        }

        // Création d'un objet userInfo avec des informations à stocker dans la session
        const userInfo = {
            id: user.id,
            nickname: user.nickname,
            isAdmin: user.role_id
        }

        req.session.user = userInfo;
        
        // Met à jour la date de dernière connexion de l'utilisateur
        await Users.updateLastConnection({ id: userInfo.id });

        res.status(200).json({ 
            message: "Login successful", 
            user: userInfo 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
}

// Déconnexion de l'utilisateur
const logout = async (req, res) => {
    // Destruction de la session utilisateur
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Server error" });
        }
        // Efface le cookie de session côté client
        res.clearCookie("session_id");
        res.status(200).json({ message: "Logout successful" });
    });
}

export { checkAuth, login, register, logout };