const express = require('express');
const versionRoutes = require('./routes/versionRoutes');
const healthRoutes = require('./routes/healthRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use('/api/version', versionRoutes);
app.use('/api/health', healthRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
