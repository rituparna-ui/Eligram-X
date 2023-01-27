const refresh =
  '1//042yG8Encu_9PCgYIARAAGAQSNwF-L9Irh3GRS2nqxmMpzEAIV9ki5oarHs0a6z5j7ArPfK9bf4WuGL8fC-2lEaSLOIQ0IXKR4gE';

const access =
  'ya29.a0AVvZVspB-S1BRWdWe2Tm-ZSrGZm-Wlc1B8qxqiDDQYddeFaUCt5gQoruVaw1EKNG4iq7AQm9F1RIUJZA8GWC5SwRNvSySzAyvx4NyUQ9KFU0JOkC_dkEcW2K3fvqfLfv1UWykwkSbPDFboasvIztLg8ykiFEaCgYKARQSARESFQGbdwaIflWQzGMSaHMi24EY5ThDUQ0163';

const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    accessToken: access,
    refreshToken: refresh,
    clientId:
      '72244162417-nf80heeq966fnsme2tdoit6qp7esvcpp.apps.googleusercontent.com',
    clientSecret: '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',
    user: 'rituw1610@gmail.com',
  },
});

module.exports = (to, subject, html) => {
  return new Promise((res, rej) => {
    transport
      .sendMail({
        from: '"Eligram-X" rituw1610@gmail.com',
        to,
        subject,
        html,
      })
      .then(() => {
        res('Mail Sent');
      })
      .catch((e) => {
        console.log(e);
        rej('Error Mailing');
      });
  });
};
