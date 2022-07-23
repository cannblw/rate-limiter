const { StatusCodes } = require('http-status-codes');

const take = async (req, res) => {
  const tokens = 42; // TODO: Implement

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
