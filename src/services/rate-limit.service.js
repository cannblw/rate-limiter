const rateLimitRepository = require('../repositories/rate-limit.repository');

class RateLimitService {
    getRateLimit(endpoint) {
        const rateLimit = rateLimitRepository.getRateLimit(endpoint);
        
        // TODO: Check wrong URLs and return 404

        // TODO: Get real tokens from token bucket
        return rateLimit.burst;
    }
}

const rateLimitService = new RateLimitService();

module.exports = rateLimitService;
