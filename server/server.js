require('./config/config');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const readline = require('readline');

const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración global de rutas
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err, res) => {
        if (err) throw err;
        console.log('BBDD ONLINE');
    });

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto: ", process.env.PORT)
});




const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// while (true) {
rl.question('¿Introduzca barcode?', (answer) => {
    rl.pause();
    // TODO: Log the answer in a database
    console.log(`Barcode: ${answer}`);

    rl.close();
});
// }