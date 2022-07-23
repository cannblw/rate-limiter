const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const RateLimitService = require('../../src/services/rate-limit.service');
const TokenBucket = require('../../src/domain/token-bucket');

const { expect } = chai;

chai.use(sinonChai);

describe('Rate Limit Service', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sinon.restore();
    sandbox.restore();
  });

  it('should create token buckets for every endpoint', () => {
    const rateLimitsPerEndpoint = [
      { endpoint: 'GET /user/:id', burst: 10, sustained: 6 },
      { endpoint: 'PATCH /user/:id', burst: 10, sustained: 5 },
      { endpoint: 'POST /userinfo', burst: 300, sustained: 100 },
    ];

    const service = new RateLimitService(rateLimitsPerEndpoint);
    expect(Object.keys(service.buckets).length).to.equal(
      rateLimitsPerEndpoint.length
    );
  });

  it('should return null when taking tokens from an undefined endpoint', () => {
    const rateLimitsPerEndpoint = [
      { endpoint: 'GET /user/:id', burst: 10, sustained: 6 },
    ];

    const service = new RateLimitService(rateLimitsPerEndpoint);

    const tokens = service.take('/this_is_fake');

    expect(tokens).to.be.null;
  });

  it('should take tokens out of a bucket if the endpoint exists', () => {
    const rateLimitsPerEndpoint = [
      { endpoint: 'GET /user/:id', burst: 10, sustained: 6 },
    ];
    const tokenBucketTakeSpy = sinon.spy(TokenBucket.prototype, 'take');

    const service = new RateLimitService(rateLimitsPerEndpoint);

    const tokens = service.take('GET /user/:id');

    expect(tokenBucketTakeSpy.called).to.be.true;
  });
});
