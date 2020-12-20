const express = require('express');

const app = express();

app.use(require('./linea'));
app.use(require('./caja'));

module.exports = app;