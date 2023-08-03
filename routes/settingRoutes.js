const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// Get the current settings
router.get('/', async (req, res) => {
    try {
        const settings = await Settings.findOne();
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// Create new settings (only if needed; generally, you'd have just one settings document)
router.post('/create', async (req, res) => {
    try {
        const newSettings = new Settings(req.body);
        await newSettings.save();
        res.status(201).json({ message: 'Settings created successfully', settings: newSettings });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// Update existing settings
router.put('/update', async (req, res) => {
    try {
        const updatedSettings = await Settings.findOneAndUpdate({}, req.body, { new: true });
        if (!updatedSettings) {
            return res.status(404).json({ error: 'Settings not found' });
        }
        res.status(200).json({ message: 'Settings updated successfully', settings: updatedSettings });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// Delete the settings (be careful with this operation)
router.delete('/delete', async (req, res) => {
    try {
        const result = await Settings.deleteOne();
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Settings not found' });
        }
        res.status(200).json({ message: 'Settings deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;
