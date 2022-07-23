const getHello = (req, res) => {
  res.send('hello world\n');
};

const postHello = (req, res) => {
  res.status(200).send(`hello ${req.body.name}\n`);
};

module.exports = {
  getHello,
  postHello,
};
