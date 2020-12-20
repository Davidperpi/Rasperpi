const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let lineaSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es necesario']
    }
});

module.exports = mongoose.model('Linea', lineaSchema);