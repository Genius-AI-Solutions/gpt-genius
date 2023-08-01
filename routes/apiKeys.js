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

        // Including the newly created API Key in the response
        res.status(201).json({
            message: 'API Key created successfully',
            apiKey: {
                key: newKey.key,
                name: newKey.name,
                // Include other properties if you want
            }
        });
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

router.get('/info', async (req, res) => {
    try {
        // Retrieve the key from the query parameter or request body
        const key = req.query.key || req.body.key;

        // Find the key in the database
        const apiKey = await ApiKey.findOne({ key: key });

        if (!apiKey) {
            return res.status(404).json({ error: 'API Key not found' });
        }

        // Respond with the desired information
        res.json({
            name: apiKey.name,
            createdAt: apiKey.createdAt,
            isActive: apiKey.isActive,
            expiresAt: apiKey.expiresAt,
            associatedUserID: apiKey.associatedUserID,
            permissions: apiKey.permissions,
            usageLimits: apiKey.usageLimits,
            usageStatistics: apiKey.usageStatistics,
            ipWhitelist: apiKey.ipWhitelist,
            environment: apiKey.environment,
            projectID: apiKey.projectID
            // You can include any other fields you need
        });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});


router.get('/list', async (req, res) => {
    try {
        // Find all API keys in the database
        const apiKeys = await ApiKey.find();

        // Respond with the list of all API keys
        res.json(apiKeys);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

router.post('/update', async (req, res) => {
    try {
      const {
        key,
        name,
        isActive,
        expiresAt,
        associatedUserID,
        permissions,
        usageLimits,
        usageStatistics,
        ipWhitelist,
        environment,
        projectID
      } = req.body;
  
      // Log the request body
      console.log('Request body:', req.body);
  
      const apiKey = await ApiKey.findOne({ key: key });
  
      // Log the found API Key
      console.log('Found API Key:', apiKey);
  
      if (!apiKey) {
        return res.status(404).json({ error: 'API Key not found' });
      }
  
      // Update the desired fields
      if (name) apiKey.name = name;
      if (isActive !== undefined) apiKey.isActive = isActive; // Can be true or false
      if (expiresAt) apiKey.expiresAt = expiresAt;
      if (associatedUserID) apiKey.associatedUserID = associatedUserID;
      if (permissions) apiKey.permissions = permissions;
      if (usageLimits) apiKey.usageLimits = usageLimits;
      if (usageStatistics) apiKey.usageStatistics = usageStatistics;
      if (ipWhitelist) apiKey.ipWhitelist = ipWhitelist;
      if (environment) apiKey.environment = environment;
      if (projectID) apiKey.projectID = projectID;
  
      // Save the updated API Key
      const updatedKey = await apiKey.save();
  
      // Log the updated API Key
      console.log('Updated API Key:', updatedKey);
  
      res.status(200).json({ message: 'API Key updated successfully', updatedKey });
    } catch (error) {
      console.error('Update error:', error);
      res.status(500).json({ error: error.toString() });
    }
  });
  

  router.delete('/delete', async (req, res) => {
    try {
        const { key } = req.body;

        // Find and delete the API Key by its key
        const result = await ApiKey.deleteOne({ key: key });

        // Check if a document was deleted
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'API Key not found' });
        }

        res.status(200).json({ message: 'API Key deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: error.toString() });
    }
});





module.exports = router;
