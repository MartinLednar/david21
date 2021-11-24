const mongoose = require('mongoose');
const dotenv = require('dotenv');

// dotenv.config({ path: '/.env' });
const app = require(__dirname + '/app');

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}...`);
});
