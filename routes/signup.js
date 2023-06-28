const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const userController = require('../controllers/users');

// Роут для создания пользователя
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(?:www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
}), userController.createUser);
module.exports = router;
