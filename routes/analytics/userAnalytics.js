const express = require('express');
const router = express.Router();
const fs = require('fs');

// File path to store the user count
const filePath = 'userCount.json';

// Read the initial user count from the file, or set a default value
let users = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')).totalUsers : 69;

// Function to save the user count to the file
function saveUsersToFile() {
  const data = JSON.stringify({ totalUsers: Math.round(users) });
  fs.writeFileSync(filePath, data);
}

// Increment user count by the specified amount per second
const usersPerHour = 0.1; // You can adjust this value as needed
const incrementPerSecond = usersPerHour / 3600;
setInterval(() => {
  users += incrementPerSecond;
  saveUsersToFile();
}, 1000);

// Endpoint to get the current user count
router.get('/', (req, res) => {
  res.json({ totalUsers: Math.round(users) }); // Just return the current user count
});

module.exports = router;
