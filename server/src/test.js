const mailer = require('./utls/mailer');

mailer(
  'rwarwatkar@gmail.com',
  'HueHue',
  `
<h1> xDD F</h1>
`
)
  .then(console.log)
  .catch(console.log);
