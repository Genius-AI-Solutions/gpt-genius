const { v4: uuidv4 } = require('uuid');
const ApiKey = require('../models/ApiKey');

const generateKey = async (req, res) => {
    try {
        let unique = false;
        let newKey = '';
        while (!unique) {
            newKey = uuidv4();
            const existingKey = await ApiKey.findOne({ key: newKey });
            if (!existingKey) unique = true;
        }

        res.json({ key: newKey });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

module.exports = {
    generateKey,
};
