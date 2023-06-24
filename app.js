const express = require('express');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const cardRoutes = require('./routes/cards');

const app = express();

const { UnauthorizedError } = require('./errors/UnauthorizedError');
const { ConflictError } = require('./errors/ConflictError');
const { ForbiddenError } = require('./errors/ForbiddenError');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/', usersRouter);
app.use('/', cardRoutes);

// Middleware для обработки ошибок
app.use(errors()); // Обработчик ошибок от celebrate

app.use((err, req, res, next) => {
  let statusCode = 500;
  let message = 'Внутренняя ошибка сервера';

  if (err instanceof UnauthorizedError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof ForbiddenError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof ConflictError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.joi) {
    // Ошибка валидации от celebrate
    statusCode = 400;
    message = err.joi.message;
  } else if (err.code === 11000) {
    // Ошибка дублирования ключа
    statusCode = 409;
    message = 'Ошибка дублирования ключа';
  }

  res.status(statusCode).json({ message });
  next();
});

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
