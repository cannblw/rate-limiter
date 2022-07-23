const chai = require('chai');

const TokenBucket = require('../../src/domain/token-bucket');

const { expect } = chai;

describe('Token bucket', () => {
  it('should consume tokens on every request', () => {
    const maxTokens = 10;
    const sustainedTokensPerMinute = 0;
    const tokenBucket = new TokenBucket(maxTokens, sustainedTokensPerMinute);

    const firstResult = tokenBucket.take();
    const secondResult = tokenBucket.take();

    expect(firstResult).to.equal(maxTokens - 1);
    expect(secondResult).to.equal(maxTokens - 2);
  });

  it('should not go under 0 tokens', () => {
    const maxTokens = 0;
    const sustainedTokensPerMinute = 0;
    const tokenBucket = new TokenBucket(maxTokens, sustainedTokensPerMinute);

    const tokens = tokenBucket.take();

    expect(tokens).to.equal(0);
  });

  it('should not go over the max quantity of tokens', (done) => {
    const maxTokens = 10;
    const sustainedTokensPerMinute = 600;
    const waitSeconds = 1;
    const tokenBucket = new TokenBucket(maxTokens, sustainedTokensPerMinute);

    const tokens = tokenBucket.take();

    setTimeout(() => {
      expect(tokens).to.equal(maxTokens - 1);
      done();
    }, waitSeconds * 1000);
  });
});
