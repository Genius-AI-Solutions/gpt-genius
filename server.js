require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const versionRoutes = require('./routes/versionRoutes');
const healthRoutes = require('./routes/healthRoutes');
const apiKeysRoutes = require('./routes/apiKeys');
const keyGenerationRoutes = require('./routes/keyGenerationRoutes');

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/version', versionRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/keys', apiKeysRoutes);
app.use('/api/keygen', keyGenerationRoutes);

app.listen(port, () => {
  console.log('---------------------------------------');
  console.log('🚀 Server successfully started!');
  console.log(`📍 Listening on: http://localhost:${port}`);
  
  if(process.env.MONGODB_URI) {
    console.log(`💾 Connected to MongoDB at: ${process.env.MONGODB_URI}`);
  } else {
    console.log('⚠️  MongoDB URI not set in .env file');
  }
  
  console.log('---------------------------------------');
  console.log('⚠️  DISCLAIMER: This server startup information is for debugging purposes only. In a production environment, sensitive information such as database connections should be securely stored and access should be limited.');
});

