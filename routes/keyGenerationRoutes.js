const express = require('express');
const router = express.Router();
const keyGenerationController = require('../controllers/keyGeneration');

router.get('/generate', keyGenerationController.generateKey);

module.exports = router;
