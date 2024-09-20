import mysql from "mysql2/promise";

// Création d'un pool de connexions MySQL avec les paramètres définis dans les variables d'environnement
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Obtention d'une connexion à partir du pool
pool.getConnection()
.then((res) => {
    // Connexion réussie - affichage du nom de la base de données dans la console
    console.log("Connected to the database " + res.config.database);
    
    // Libération de la connexion pour la rendre disponible dans le pool
    pool.releaseConnection(res);
})
.catch((err) => 
    // Gestion d'erreur en cas d'échec de connexion, affichage du message d'erreur
    console.error("Error while connecting to the database: " + err.message)
);

// Exportation du pool de connexions pour être utilisé dans d'autres parties de l'application
export default pool;