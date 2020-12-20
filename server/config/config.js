// ===================
// Puerto
// ===================
process.env.PORT = process.env.PORT || 3000; // 

// ===================
// Entorno
// =================== 
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'; // 

// ===================
// Base de datos
// =================== 
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/proyecto';
} else {
    // urlDB = process.env.MONGO_URI;
    urlDB = 'mongodb+srv://admin:ea5Xtmrpxk8xEjKn@cluster0.jgfdg.mongodb.net/proyecto';
}
process.env.URLDB = urlDB;