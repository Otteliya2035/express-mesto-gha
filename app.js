const express = require('express');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');
// const auth = require('./middlewares/auth');
// const signin = require('./routes/signin');
// const signup = require('./routes/signup');
// const usersRouter = require('./routes/users');
// const cardRoutes = require('./routes/cards');
const routes = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(signin);
// app.use(signup);

// app.use('/users/', auth, usersRouter);
// app.use('/cards/', auth, cardRoutes);
// app.get('/', (req, res) => {
//   res.send('Hello, world!');
// });
app.use('/', routes);
app.use(errorHandler);
app.use(errors()); // Обработчик ошибок от celebrate
// app.all('*', (req, res) => {
//   res.status(404).json({ message: 'not found' });
// }); // Эту часть максимум можно вынести в какой-то
// глобальный роут. Но избавиться от него нельзя никак.

// Middleware для обработки ошибок
// app.use((req, res, next) => {
//   next({ statusCode: 404 });
// });

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
