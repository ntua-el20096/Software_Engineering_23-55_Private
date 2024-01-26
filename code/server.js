const express = require('express');
const https = require('https');
const fs = require('fs');
const adminRoutes = require('./adminRoutes');
const systemRoutes = require('./systemRoutes');

const app = express();
const port = 8765;
const httpsOptions = {
  key: fs.readFileSync('server.key', 'utf8'),
  cert: fs.readFileSync('server.crt', 'utf8'),
  passphrase: '2372002'
};

app.use(express.json());
app.use('/energy/api/admin', adminRoutes);
app.use('/energy/api', systemRoutes);

const httpsServer = https.createServer(httpsOptions, app);
httpsServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
