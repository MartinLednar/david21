const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const ejs = require('ejs');
const mongoose = require('mongoose');

const addSongRouter = require(__dirname + '/routes/addSongRoutes');
const deleteSongRouter = require(__dirname + '/routes/deleteSongRoutes');
const mainRouter = require(__dirname + '/routes/mainRoutes');
const shopRouter = require(__dirname + '/routes/shopRoutes');
const loginRouter = require(__dirname + '/routes/loginRoutes');
const sendSongRouter = require(__dirname + '/routes/sendSongRoutes');
const notFoundRouter = require(__dirname + '/routes/notFoundRoutes');
const addToCartRouter = require(__dirname + '/routes/addToCartRoutes');
const payRouter = require(__dirname + '/routes/payRoutes');

const paymentSuccessRouter = require(__dirname +
  '/routes/paymentSuccessRoutes');
const payMailRouter = require(__dirname + '/routes/payMailRoutes');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('DB Atlas connection successful');
    });
} else {
  mongoose
    .connect(process.env.DATABASE_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(c => {
      console.log('DB connection successful', c);
    });
}
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongoose.connection,
      ttl: 14 * 24 * 60 * 60, // =  expiration
      autoRemove: 'disabled',
      autoRemoveInterval: 15,
      crypto: {
        secret: process.env.SESSION_CRYPTO_SECRET,
      },
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({
//       mongoUrl: process.env.DATABASE,
//       ttl: 14 * 24 * 60 * 60, // =  expiration
//       autoRemove: 'interval',
//       autoRemoveInterval: 15,
//       crypto: {
//         secret: process.env.SESSION_CRYPTO_SECRET,
//       },
//     }),
//   })
// );
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/', mainRouter);
app.use('/login', loginRouter);
app.use('/add', addSongRouter);
app.use('/cart', addToCartRouter);
app.use('/delete', deleteSongRouter);
app.use('/shop', shopRouter);
app.use('/songs', sendSongRouter);
app.use('/pay', payRouter);
app.use('/payment-success', paymentSuccessRouter);
app.use('/pay-mail', payMailRouter);

app.use('*', notFoundRouter);

module.exports = app;
