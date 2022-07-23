class TokenBucket {
  constructor(burst, sustained) {
    this.quantity = burst;
    this.sustained = sustained;
  }

  take() {
    return this.quantity > 0 ? --this.quantity : 0;
  }
}

module.exports = TokenBucket;
