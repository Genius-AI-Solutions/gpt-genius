const express = require('express');
const router = express.Router();
const openaiController = require('../controllers/openaiController'); // Make sure to have this file in your project

// Endpoint for simplified queries to OpenAI's GPT model
router.post('/simple', openaiController.simpleQuery);

// Endpoint for more advanced and customizable queries to OpenAI's GPT model
router.post('/advanced', openaiController.advancedQuery);

module.exports = router;
