const express = require('express');
const router = express.Router();
const ApiKey = require('../models/ApiKey');


router.post('/create', async (req, res) => {
    try {
        const newKey = new ApiKey({
            key: req.body.key,
            name: req.body.name,
        });

        await newKey.save();

        res.status(201).json({ message: 'API Key created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

router.post('/validate', async (req, res) => {
    try {
        const apiKey = await ApiKey.findOne({ name: req.body.name });

        if (!apiKey) {
            return res.status(401).json({ error: 'Invalid API Key' });
        }

        apiKey.compareKey(req.body.key, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(401).json({ error: 'Invalid API Key' });
            }

            res.json({ message: 'API Key validated successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;
