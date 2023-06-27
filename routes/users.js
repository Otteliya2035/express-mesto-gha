const express = require('express');

const router = express.Router();
const { celebrate, Joi } = require('celebrate');
const userController = require('../controllers/users');

// Роут для получения всех пользователей
router.get('/', userController.getUsers);

// Роут для получения информации о текущем пользователе
router.get('/me', userController.getCurrentUser);

// Роут для получения пользователя по _id
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
}), userController.getUserById);

// Роут для обновления профиля пользователя
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), userController.updateUserProfile);

// Роут для обновления аватара пользователя
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/(?:www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/),
  }),
}), userController.updateUserAvatar);

module.exports = router;
