const MINUTES_PER_SECOND = 60;
const MILLIS_PER_SECOND = 1000;

class TokenBucket {
  constructor(maxTokens, sustainedTokensPerMinute) {
    this.maxTokens = maxTokens;
    this.sustainedTokensPerMilli =
      sustained / MINUTES_PER_SECOND / MILLIS_PER_SECOND;

    this.currentTokens = maxTokens;
    this.lastRefillDate = Date.now();
  }

  take() {
    this.refill();

    return this.currentTokens > 0 ? --this.currentTokens : 0;
  }

  refill() {
    const currentRefillDate = Date.now();
    const millisFromLastRefill = currentRefillDate - this.lastRefillDate;

    const tokensToRefill = Math.floor(
      millisFromLastRefill * this.sustainedTokensPerMilli
    );

    this.currentTokens = Math.min(
      this.maxTokens,
      this.currentTokens + tokensToRefill
    );

    this.lastRefillDate = currentRefillDate;
  }
}

module.exports = TokenBucket;
