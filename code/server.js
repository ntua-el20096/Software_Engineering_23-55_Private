// server.js
const https = require('https');
const fs = require('fs');
const app = require('./routes');

const httpsOptions = {
  key: fs.readFileSync('server.key', 'utf8'),
  cert: fs.readFileSync('server.crt', 'utf8'),
  passphrase: '2372002',
};

const port = 8765;

const httpsServer = https.createServer(httpsOptions, app);

httpsServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
