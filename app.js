const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');

const cardRoutes = require('./routes/cards');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '64886d4f1e6fc3961753e62e',
  };

  next();
});
const handleNotFound = (req, res) => {
  res.status(404).json({ message: 'Not Found' });
};

app.use('/users', usersRouter);
app.use('/cards', cardRoutes);
app.use(handleNotFound);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const { PORT = 3000 } = process.env;
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
