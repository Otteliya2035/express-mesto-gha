const { celebrate, Joi } = require('celebrate', 'Joi');

const router = require('express').Router();

const userController = require('../controllers/users');
const auth = require('../middlewares/auth');
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), userController.login);
//router.use(auth);

module.exports = router;
