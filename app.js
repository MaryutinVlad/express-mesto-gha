const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const cardsRouter = require('./routes/cards');
const userRouter = require('./routes/users');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, _res, next) => {
  req.user = {
    _id: '62a07afcd76028e9fd725dff',
  };

  next();
});
app.use(bodyParser.json());
app.use('/', userRouter);
app.use('/', cardsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
