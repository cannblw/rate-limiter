const TokenBucket = require('../domain/token-bucket');
const config = require('../config.json');

class RateLimitService {
  constructor(rateLimitsPerEndpoint) {
    this.buckets = {};

    for (let item of rateLimitsPerEndpoint) {
      this.buckets[item.endpoint] = new TokenBucket(item.burst, item.sustained);
    }
  }

  take(endpoint) {
    const bucket = this.buckets[endpoint];

    if (!bucket) {
      return null;
    }

    return bucket.take();
  }
}

const rateLimitService = new RateLimitService(config.rateLimitsPerEndpoint);

module.exports = rateLimitService;
