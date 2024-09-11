import bcrypt from "bcrypt";
import Users from "../model/Users.js";

/**
 * Checks if a user session exists.
 * 
 * If a user session exists, responds with a JSON message indicating the user is logged in
 * and includes user details. If no session exists, responds with a 401 Unauthorized status.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const checkAuth = (req, res) => {
    if(req.session.user){
        res.json({ message: "User logged in", user: req.session.user });
    } else {
        res.status(401).json({ message: "User not logged in" });
    }
}

/**
 * Registers a new user.
 * 
 * Checks if a user with the provided email already exists. If so, returns a 409 Conflict status.
 * Otherwise, hashes the password and adds the new user to the database. Returns a 201 Created status
 * upon successful registration.
 * 
 * @param {Object} req - The request object containing user registration data.
 * @param {Object} res - The response object.
 */
const register = async (req, res) => {
    try {
        const existingUser = await Users.getByEmailUsers({ email: req.body.email });
        if (existingUser.length) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = {
            nickname: req.body.nickname,
            email: req.body.email,
            password: hashedPassword // corrected typo from "passeword" to "password"
        }

        await Users.addUsers(newUser);

        res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

/**
 * Logs in a user.
 * 
 * Retrieves the user by email and verifies the password. If credentials are correct,
 * sets the user session and updates their last connection time. Responds with a 200 OK
 * status and user details upon successful login. Returns a 401 Unauthorized status if
 * credentials are incorrect.
 * 
 * @param {Object} req - The request object containing user login credentials.
 * @param {Object} res - The response object.
 */
const login = async (req, res) => {
    try {
        const [user] = await Users.getByEmailUsers({ email: req.body.email });

        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(401).json({ message: "Incorrect credentials" });
        }

        const userInfo = {
            id: user.id,
            nickname: user.nickname,
            isAdmin: user.isAdmin
        }

        req.session.user = userInfo;
        
        await Users.updateLastConnection({ id: userInfo.id });
        res.status(200).json({ message: "Login successful", user: userInfo });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

/**
 * Logs out a user.
 * 
 * Destroys the user session and clears the session cookie. Responds with a 200 OK status
 * upon successful logout. Returns a 500 Internal Server Error status if logout fails.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Server error" });
        }
        res.clearCookie("session_id");
        res.status(200).json({ message: "Logout successful" });
    });
}

export { checkAuth, login, register, logout };