const express = require('express');
const router = express.Router();
const fs = require('fs');

// File path to store the request count
const filePath = 'requestCount.json';

// Read the initial request count from the file, or set a default value
let requests = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')).totalRequests : 100;

// Function to save the request count to the file
function saveRequestsToFile() {
  const data = JSON.stringify({ totalRequests: Math.round(requests) });
  fs.writeFileSync(filePath, data);
}

// Increment request count by the specified amount per second
const requestsPerHour = 6000;
const incrementPerSecond = requestsPerHour / 3600;
setInterval(() => {
  requests += incrementPerSecond;
  saveRequestsToFile();
}, 1000);

// Endpoint to get the current request count
router.get('/', (req, res) => {
  requests++; // Increment the request count
  saveRequestsToFile(); // Save to the file
  res.json({ totalRequests: Math.round(requests) });
});

module.exports = router;
