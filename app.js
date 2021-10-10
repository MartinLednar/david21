const express = require('express');
const ejs = require('ejs');

const addSongRouter = require('./routes/addSongRoutes');
const deleteSongRouter = require('./routes/deleteSongRoutes');
const mainRouter = require('./routes/mainRoutes');
const shopRouter = require('./routes/shopRoutes');
const loginRouter = require('./routes/loginRoutes');
const sendSongRouter = require('./routes/sendSongRoutes');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/', mainRouter);
app.use('/login', loginRouter);
app.use('/add', addSongRouter);
app.use('/delete', deleteSongRouter);
app.use('/shop', shopRouter);
app.use('/songs', sendSongRouter);

module.exports = app;
