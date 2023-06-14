const User = require('../models/user');

// Получение всех пользователей
const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
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
        res.status(404).send({ message: 'User not found' });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
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
        res.status(400).send({ message: err.message }); // Обработка ошибки валидации
      } else {
        res.status(500).send({ message: err.message }); // Обработка других ошибок
      }
    });
};

// Обновление профиля пользователя
const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user_id;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true },
  )
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message }); // Обработка ошибки валидации
      } else {
        res.status(500).send({ message: err.message }); // Обработка других ошибок
      }
    });
};

// Обновление аватара пользователя
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user_id,
    { avatar },
    { new: true },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message }); // Обработка ошибки валидации
      } else {
        res.status(500).send({ message: err.message }); // Обработка других ошибок
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
