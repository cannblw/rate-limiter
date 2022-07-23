const chai = require('chai');

const TokenBucket = require('../../../src/domain/token-bucket');

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
});
