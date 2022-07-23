const express = require('express');
const swaggerUi = require('swagger-ui-express');
const validator = require('express-joi-validation').createValidator({});

const controller = require('./controller');
const swaggerDocument = require('./swagger.json');
const takeRequestSchema = require('./schemas/take-request.schema');

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/take', validator.body(takeRequestSchema), controller.take);

module.exports = app;
