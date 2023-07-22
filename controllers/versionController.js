const packageJson = require('../package.json');

const getVersion = (req, res) => {
  res.json({ version: packageJson.version });
};

module.exports = {
  getVersion,
};
