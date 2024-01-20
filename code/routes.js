// routes.js
const express = require('express');
const handlerRoutes = require('./handler');
const endpointsRoutes = require('./endpoints');
const router = express.Router();

// Use the handlerRoutes for requests starting with '/handler'
router.use('/admin', handlerRoutes);

// Use the endpointsRoutes for all other requests
router.use(endpointsRoutes);

// module.exports = router;
module.exports = { router, app };
