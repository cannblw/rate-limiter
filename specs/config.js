const chai = require('chai');
const Joi = require('joi');

const config = require('../src/config.json');

const { expect } = chai;

describe('Rate limiter config', () => {
  it('should have the correct shape', () => {
    const schema = Joi.object().keys({
      rateLimitsPerEndpoint: Joi.array().items(
        Joi.object().keys({
          endpoint: Joi.string(),
          burst: Joi.number().integer(),
          sustained: Joi.number().integer(),
        })
      ),
    });

    const validationResults = schema.validate(config);
    console.log(validationResults);

    expect(validationResults.error).to.be.undefined;
  });
});
