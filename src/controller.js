const { StatusCodes } = require('http-status-codes');
const { rateLimitService } = require('./services');

const take = (req, res) => {
  const { method, endpoint } = req.body;

  const template = `${method} ${endpoint}`;

  const tokens = rateLimitService.take(template);

  if (tokens === 0) {
    res.status(StatusCodes.TOO_MANY_REQUESTS);
  } else if (!tokens) {
    res.status(StatusCodes.NOT_FOUND);
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
