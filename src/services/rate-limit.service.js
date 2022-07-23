const rateLimitRepository = require('../repositories/rate-limit.repository');

const config = require('../config.json');

class RateLimitService {
  constructor() {
    this.buckets = {};

    for (let item of config.rateLimitsPerEndpoint) {
      this.buckets[item.endpoint] = new TokenBucket(item.burst, item.sustained);
    }
  }

  getRateLimit(endpoint) {
    const bucket = this.buckets[]
    const rateLimit = rateLimitRepository.getRateLimit(endpoint);

    

    // TODO: Get real tokens from token bucket
    return rateLimit.burst;
  }
}

const rateLimitService = new RateLimitService();

module.exports = rateLimitService;
