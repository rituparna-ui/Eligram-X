const { redisInit, getRedis } = require('./../utls/db/redis');

redisInit()
  .then(async () => {
    const kek = await getRedis().json.get(
      'user:sessions:63c266eb2d5d1dae7223e52d'
    );
    console.log(kek);
  })
  .catch((err) => {
    console.log(err);
  });
