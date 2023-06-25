const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const userController = require('../controllers/users');
const auth = require('../middlewares/auth');

// Роут для создания пользователя
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(?:www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), userController.createUser);
//router.use(auth);

module.exports = router;
