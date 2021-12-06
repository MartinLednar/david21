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
const discMsgRouter = require(__dirname + '/routes/addDiscMsgRoutes');

const paymentSuccessRouter = require(__dirname +
  '/routes/paymentSuccessRoutes');
const payMailRouter = require(__dirname + '/routes/payMailRoutes');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env?.NODE_ENV
        ? process.env.DATABASE
        : process.env.DATABASE_LOCAL,
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

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', mainRouter);
app.use('/login', loginRouter);
app.use('/add', addSongRouter);
app.use('/cart', addToCartRouter);
app.use('/delete', deleteSongRouter);
app.use('/shop', shopRouter);
app.use('/songs', sendSongRouter);
app.use('/pay', payRouter);
app.use('/payment-success', paymentSuccessRouter);
app.use('/disc-message', discMsgRouter);
app.use('/pay-mail', payMailRouter);
app.use('*', notFoundRouter);

module.exports = app;
