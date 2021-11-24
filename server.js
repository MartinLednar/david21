const mongoose = require('mongoose');
const dotenv = require('dotenv');

// dotenv.config({ path: '/.env' });
const app = require(__dirname + '/app');

if (process.env.NODE_ENV === 'production') {
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('DB Atlas connection successful');
    });
}

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}...`);
});
