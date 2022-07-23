const Joi = require('joi');

module.exports = Joi.object({
  method: Joi.string().required(),
  endpoint: Joi.string().required(),
});
