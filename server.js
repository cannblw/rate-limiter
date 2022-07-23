const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world\n');
});

app.post('/', (req, res) => {
  res.status(200).send(`hello ${req.body.name}\n`);
});

module.exports = app;