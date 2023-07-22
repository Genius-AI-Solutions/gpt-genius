const packageJson = require('../package.json');

const checkHealth = (req, res) => {
  res.status(200).json({
    status: 'online',
    version: packageJson.version
  });
};

module.exports = {
  checkHealth,
};
