const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const ejs = require('ejs');

const addSongRouter = require('./routes/addSongRoutes');
const deleteSongRouter = require('./routes/deleteSongRoutes');
const mainRouter = require('./routes/mainRoutes');
const shopRouter = require('./routes/shopRoutes');
const loginRouter = require('./routes/loginRoutes');
const sendSongRouter = require('./routes/sendSongRoutes');
const notFoundRouter = require('./routes/notFoundRoutes');
const addToCartRouter = require('./routes/addToCartRoutes');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_LOCAL,
      ttl: 1 * 24 * 60 * 60, // = 1 day expiration
      autoRemove: 'interval',
      autoRemoveInterval: 15,
      crypto: {
        secret: process.env.SESSION_CRYPTO_SECRET,
      },
    }),
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/', mainRouter);
app.use('/login', loginRouter);
app.use('/add', addSongRouter);
app.use('/add-to-cart', addToCartRouter);
app.use('/delete', deleteSongRouter);
app.use('/shop', shopRouter);
app.use('/songs', sendSongRouter);
app.use('*', notFoundRouter);

module.exports = app;
