const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

const User = require('./../../models/user');
mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb://localhost:27017/eligram')
  .then(async () => {
    const password = await bcrypt.hash('qwer1234', 12);

    for (let _ = 0; _ < 1000; _++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      await User.create({
        firstName,
        lastName,
        email: faker.internet
          .email(firstName, lastName, '', {
            allowSpecialCharacters: false,
          })
          .toLowerCase(),
        password,
        username: faker.internet.userName(firstName, lastName),
        state: Math.random() > 0.66 ? 0 : Math.random() > 0.33 ? 1 : 0,
        role: Math.random() > 0.85 ? 'ADMIN' : 'USER',
        vcode: 123456,
        gender: Math.random() > 0.4 ? 'male' : 'female',
        dateOfBirth: {
          date: _ % 28,
          month: _ % 12,
          year: 2001,
        },
      });
      console.log(_ + 1);
    }
    process.exit(0);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(0);
  });
