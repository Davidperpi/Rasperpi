// ===================
// Puerto
// ===================
process.env.PORT = 3000; // process.env.PORT ||

// ===================
// Entorno
// =================== 
process.env.NODE_ENV = 'dev'; // process.env.NODE_ENV || 

// ===================
// Vencimiento del Token
// =================== 
process.env.CADUCIDAD_TOKEN = { expiresIn: '120h' };

// ===================
// SEED
// =================== 
process.env.SEED = 'este-es-el-seed-desarrollo'; // process.env.SEED ||

// ===================
// Base de datos
// =================== 
let urlDB;


// if (process.env.NODE_ENV === 'dev') {
urlDB = 'mongodb://localhost:27017/proyecto';
// } else {
//     urlDB = process.env.MONGO_URI;
// }
process.env.URLDB = urlDB;

// ===================
// Google Client ID
// =================== 
process.env.CLIENT_ID = process.env.CLIENT_ID || '44493566020-e7qftufef0j8100ffpv3eqmbntfqjcmg.apps.googleusercontent.com';