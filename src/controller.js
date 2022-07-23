const { StatusCodes } = require('http-status-codes');
const rateLimitService = require('./services/rate-limit.service');

const take = (req, res) => {
  const {
    method,
    endpoint,
  } = req.body;

  const template = `${method} ${endpoint}`;

  const tokens = rateLimitService.getRateLimit(template);

  if (tokens === 0) {
    res.status(StatusCodes.TOO_MANY_REQUESTS);
  } else {
    res.status(StatusCodes.OK);
  }

  return res.send({
    tokens,
  });
};

module.exports = {
  take,
};
