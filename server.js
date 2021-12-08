const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });
const app = require(__dirname + '/app');

if (process.env?.NODE_ENV) {
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      minPoolSize: 100,
    })
    .then(() => {
      console.log('DB Atlas connection successful');
    });
} else {
  mongoose
    .connect(process.env.DATABASE_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      minPoolSize: 100,
    })
    .then(() => {
      console.log('DB connection successful');
    });
}

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}...`);
});
