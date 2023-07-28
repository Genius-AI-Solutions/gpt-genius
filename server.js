require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const versionRoutes = require('./routes/versionRoutes');
const healthRoutes = require('./routes/healthRoutes');
const apiKeysRoutes = require('./routes/apiKeys');
const keyGenerationRoutes = require('./routes/keyGenerationRoutes'); // New line

// Set up default mongoose connection to a MongoDB server
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());  // This is to handle JSON requests

app.use('/api/version', versionRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/keys', apiKeysRoutes);
app.use('/api/keygen', keyGenerationRoutes);  // New line

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(process.env.MONGODB_URI);
});
