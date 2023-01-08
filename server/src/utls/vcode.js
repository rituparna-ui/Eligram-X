module.exports = () => {
  let x = 0;
  while (x < 100000) {
    x += Math.random() * 1000000;
  }
  return parseInt(x);
};
