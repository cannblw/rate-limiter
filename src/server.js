const express = require('express');
const controller = require('./controller');

const app = express();
app.use(express.json());

app.post('/take', controller.take);

module.exports = app;
