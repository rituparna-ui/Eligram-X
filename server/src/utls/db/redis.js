const redis = require('redis');

const redisClient = redis.createClient();

const connect = () => {
  return redisClient.connect();
};

const getRedis = () => {
  return redisClient;
};

module.exports = {
  redisInit: connect,
  getRedis: getRedis,
};
