const path = require('path');
const express = require('express');
const historyApi = require('connect-history-api-fallback');
const middlewares = require('./middlewares');

const SERVER_PORT = process.env.PORT || 3000;
const PUBLIC_FOLDER = path.resolve(__dirname, '..', '..', 'dist');

const setupServer = () => {
  const app = express();

  app.use(
    middlewares.xPoweredBy(),
    middlewares.log() // eslint-disable-line
  );

  app.get('/health', (req, res) => res.sendStatus(200));

  // using historyApi as one of the last middlewares since it proxies requests
  // to an index page. It is being used because all routes are handled in
  // client and not server side.
  // More explanation: https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writting-manually
  app.use(
    historyApi(),
    express.static(PUBLIC_FOLDER) // eslint-disable-line
  );

  return app;
};

if (require.main === module) {
  setupServer().listen(SERVER_PORT, (error) => {
    if (error) {
      return console.error(error);
    }
    return console.log('Webserver started at', SERVER_PORT);
  });
}

module.exports = setupServer;
