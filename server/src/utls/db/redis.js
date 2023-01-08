const redis = require('redis');

const redisObject = {
  instance: null,
  connect() {
    this.instance = redis.createClient();
    return this.instance.connect();
  },
  getRedis() {
    if (!this.instance) {
      throw new Error('REDIS Not Connected');
    }
    return this.instance;
  },
};

module.exports = {
  redisInit: redisObject.connect,
  getRedis: redisObject.getRedis,
};
