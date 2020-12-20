const express = require('express');
const Linea = require('../models/linea');

const app = express();

// ====================================
// Obtiene todas las lineas
// ====================================
app.get('/linea', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Linea.find()
        .skip(desde)
        .limit(limite)
        .exec((err, lineas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Linea.count((err, conteo) => {
                res.json({
                    ok: true,
                    conteo,
                    lineas
                })
            });
        });

});

// ====================================
// Crea una linea
// ====================================
app.post('/linea', (req, res) => {

    let body = req.body;

    let linea = new Linea({
        nombre: body.nombre
    });

    linea.save((err, lineaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!lineaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            linea: lineaDB
        });
    });
});

// ====================================
// Actualizar una linea por id
// ====================================
app.put('/linea/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let linea = {
        nombre: body.nombre
    };

    Linea.findByIdAndUpdate(id, linea, { new: true, runValidators: true }, (err, lineaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!lineaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            caja: lineaDB
        });
    });
});

// ====================================
// Borra una linea por ID
// ====================================
app.delete('/linea/:id', (req, res) => {

    let id = req.params.id;

    Linea.findByIdAndRemove(id, (err, lineaBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!lineaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            linea: 'Linea borrada'
        });
    });
});

module.exports = app;