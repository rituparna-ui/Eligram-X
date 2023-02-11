const express = require('express');
const cors = require('cors');
const useragentParser = require('express-useragent');

const MONGO = require('./src/utls/db/mongo');
const REDIS = require('./src/utls/db/redis');
const API_ROUTES = require('./src/routes');

const lastSeen = require('./src/middlewares/lastSeen');

const app = express();

app.use(cors());
app.use(express.json());
app.use(useragentParser.express());

app.use(lastSeen());

app.use('/api', API_ROUTES);

app.use(async (req, res, next) => {
  return res.status(404).json({
    message: 'Not Found',
    status: 404,
  });
});

app.use(async (err, req, res, next) => {
  return res.status(err.status).json({
    message: err.message,
    status: err.status,
    errors: err.errors,
  });
});

MONGO()
  .then(() => {
    console.log('MONGO Connected');
    return REDIS.redisInit();
  })
  .then(() => {
    console.log('REDIS Connected');
    return app.listen(3000);
  })
  .then(() => {
    console.log('EXPRS Connected');
  })
  .catch((err) => {
    console.log(err.message);
    console.log(err);
    process.exit(0);
  });
