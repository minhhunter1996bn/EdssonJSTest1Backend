const express = require('express');
const service = require('./modules/service');
const bodyParser = require('body-parser');
module.exports = async () => {
  const app = express();
  const api = require('./api')(express, service);
  app.use(
    bodyParser.json({
      limit: '50mb',
    })
  );
  app.use('/api', api);
  return app;
}