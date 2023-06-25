const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();

const userController = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), userController.login);

module.exports = router;
