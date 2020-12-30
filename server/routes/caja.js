const express = require('express');
const Caja = require('../models/caja');

const app = express();

// ====================================
// Obtiene todas las cagas
// ====================================
app.get('/caja', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Caja.find({})
        .skip(desde)
        .limit(limite)
        .populate('linea')
        .exec((err, cajas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Caja.count((err, conteo) => {
                res.json({
                    ok: true,
                    conteo,
                    cajas
                })
            });
        });

});

// ====================================
// Crea una caja
// ====================================
app.post('/caja', (req, res) => {

    let body = req.body;

    let hoy = new Date();

    let caja = new Caja({
        deviceId: body.deviceId,
        barcode: body.barcode,
        fecha: hoy,
        // linea: body.linea
    });

    caja.save((err, cajaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!cajaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            caja: cajaDB
        });
    });
});

// ====================================
// Actualizar una caja por id
// ====================================
app.put('/caja/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let caja = {
        nombre: body.nombre,
        // linea: body.linea // por ahora no se puede actualizar la linea
    };

    Caja.findByIdAndUpdate(id, caja, { new: true, runValidators: true }, (err, cajaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!cajaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            caja: cajaDB
        });
    });
});

// ====================================
// Borra una caja por ID
// ====================================
app.delete('/caja/:id', (req, res) => {

    let id = req.params.id;

    Caja.findByIdAndRemove(id, (err, cajaBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!cajaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            caja: 'Caja borrada'
        });
    });
});

module.exports = app;