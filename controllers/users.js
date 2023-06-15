const User = require('../models/user');

// Получение всех пользователей
const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

//  Получение пользователя по _id
const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || (err.name === 'CastError')) {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// Создание пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' }); // Обработка ошибки валидации
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' }); // Обработка других ошибок
      }
    });
};

// Обновление профиля пользователя
const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user_id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  ).then((user) => {
    res.status(200).send(user);
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: 'Переданы некорректные данные' }); // Обработка ошибки валидации
    } else {
      res.status(500).json({ message: 'На сервере произошла ошибка' }); // Обработка других ошибок
    }
  });
};

// Обновление аватара пользователя
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user_id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: 'Переданы некорректные данные' }); // Обработка ошибки валидации
      } else {
        res.status(500).json({ message: 'На сервере произошла ошибка' }); // Обработка других ошибок
      }
    });
};

module.exports = {
  updateUserProfile,
  updateUserAvatar,
  getUsers,
  getUserById,
  createUser,
};
