const express = require('express');
const router = express.Router();
const versionController = require('../controllers/versionController');

router.get('/', versionController.getVersion);

module.exports = router;
