const express = require('express');
const router = express.Router();
const fs = require('fs');

// File path to store the active data sources count
const filePath = 'dataSourceCount.json';

// Read the initial data sources count from the file, or set a default value
let dataSources = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')).totalDataSources : 175000000000;

// Function to save the data sources count to the file
function saveDataSourcesToFile() {
  const data = JSON.stringify({ totalDataSources: Math.round(dataSources) });
  fs.writeFileSync(filePath, data);
}

// Increment data sources count by the specified amount per second (if needed)
const dataSourcesPerHour = 120000; // Adjust this value as needed or remove if not required
const incrementPerSecond = dataSourcesPerHour / 3600;
setInterval(() => {
  dataSources += incrementPerSecond;
  saveDataSourcesToFile();
}, 1000);

// Endpoint to get the current data sources count
router.get('/', (req, res) => {
  res.json({ totalDataSources: Math.round(dataSources) }); // Just return the current count
});

module.exports = router;
