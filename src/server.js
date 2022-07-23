const express = require('express');
const controller = require('./controller');

const app = express();
app.use(express.json());

app.get('/', controller.getHello);
app.post('/', controller.postHello);

module.exports = app;
