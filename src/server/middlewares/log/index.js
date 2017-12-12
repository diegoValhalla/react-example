const bunyan = require('bunyan');
const uuid = require('uuid/v1');

const log = bunyan.createLogger({
  name: 'react-example',
  serializers: {
    req: req => ({
      method: req.method,
      url: req.url,
      hostname: req.hostname,
    }),
    res: res => ({
      statusCode: res.statusCode,
    }),
  },
});

module.exports = () => (req, res, next) => {
  const reqId = uuid();

  log.info({ reqId, req });

  res.on('finish', () => {
    log.info({ reqId, res });
  });

  next();
};
