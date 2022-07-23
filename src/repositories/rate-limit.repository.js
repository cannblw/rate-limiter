const config = require('./config.json');

class RateLimitRepository {
    constructor(rateLimitsPerEndpoint) {
        this.rateLimits = rateLimitsPerEndpoint.reduce((prev, current) => ({
            ...prev,
            [current.endpoint]: {
                burst: current.burst,
                sustained: current.sustained,
            }
        }), {});
    }

    getRateLimit(endpoint) {
        const limit = this.rateLimits[endpoint] ?? null;
    }
}

const rateLimitRepository = new RateLimitRepository(config.rateLimitsPerEndpoint);

module.exports = rateLimitRepository;
