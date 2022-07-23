const config = require('../config.json');
const RateLimitService = require('./rate-limit.service');

const rateLimitService = new RateLimitService(config.rateLimitsPerEndpoint);

module.exports = {
  rateLimitService,
};
