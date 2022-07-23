class TokenBucket {
  constructor(maxTokens, sustained) {
    this.maxTokens = maxTokens;
    this.sustainedTokens = sustained;

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
    const refillsPerMillisecond = this.sustained / 1000;

    const tokensToRefill = Math.floor(
      millisFromLastRefill * refillsPerMillisecond
    );

    this.currentTokens = Math.min(
      this.maxTokens,
      this.currentTokens + tokensToRefill
    );
    this.lastRefillDate = currentRefillDate;
  }
}

module.exports = TokenBucket;
