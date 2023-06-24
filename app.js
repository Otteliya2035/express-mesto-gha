const express = require('express');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const errorHandler = require('./middlewares/error-hendler');

const cardRoutes = require('./routes/cards');
const signin = require('./routes/signin');
const signup = require('./routes/signup');

const app = express();

app.use('/', usersRouter);
app.use('/', cardRoutes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(signin);
app.use(signup);
app.post('/signin', login);
app.post('/signup', createUser);

// Middleware для обработки ошибок
app.use(errors()); // Обработчик ошибок от celebrate
app.use(errorHandler);

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
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
