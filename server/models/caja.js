const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let cajaSchema = new Schema({
    deviceId: {
        type: String,
        // required: [true, 'El device es necesario']
    },
    barcode: {
        type: String,
        required: [true, 'El barcode es necesario']
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es necesaria']
    },
    linea: {
        type: Schema.Types.ObjectId,
        ref: 'Linea'
    }
});

module.exports = mongoose.model('Caja', cajaSchema);