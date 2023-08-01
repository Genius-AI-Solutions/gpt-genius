const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure this path points to your User model

const bcrypt = require('bcryptjs');

// ...

router.post('/create', async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            firstName,
            lastName,
            role,
            isActive,
            dateOfBirth
            // add other properties here if needed
        } = req.body;

        // Hashing the password
        const saltRounds = 10; // You can adjust the number of rounds based on your security requirements
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword, // Ensure the password is hashed
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role, // Set the role from the request body
            isActive: req.body.isActive,
            dateOfBirth: req.body.dateOfBirth,
            // Add other fields as needed
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});



// Get user information
router.get('/info', async (req, res) => {
    try {
        const username = req.query.username;

        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Respond with the desired information
        res.json({
            username: user.username,
            email: user.email,
            // Include other properties if you want
        });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// Update user details
router.post('/update', async (req, res) => {
    try {
        const username = req.body.username;
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the desired fields
        if (req.body.email) user.email = req.body.email;
        if (req.body.password) user.password = req.body.password; // Make sure to hash the password in the User model
        if (req.body.isActive !== undefined) user.isActive = req.body.isActive;

        const updatedUser = await user.save();

        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: error.toString() });
    }
});

// Delete a user
router.delete('/delete', async (req, res) => {
    try {
        const username = req.body.username;

        // Find and delete the user by its username
        const result = await User.deleteOne({ username: username });

        // Check if a document was deleted
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: error.toString() });
    }
});

router.get('/list', async (req, res) => {
    try {
        // Find all users in the database
        const users = await User.find();

        // Respond with the list of all users
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;
