const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

const secret = speakeasy.generateSecret({
  issuer: 'Eligram',
  name: 'Eligram@' + 'Rituparna Warwatkar',
});

console.log(secret);

// qrcode.toDataURL(secret.otpauth_url).then((value) => {
//   console.log(value)
// });
