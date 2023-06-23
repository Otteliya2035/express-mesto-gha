const express = require('express');

const router = express.Router();
const cardController = require('../controllers/cards');
const { celebrate, Joi } = require('celebrate');

// Роут для получения всех карточек
router.get('/', cardController.getAllCards);

// Роут для создания карточки
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^https?:\/\/(?:www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/),
  }),
}), cardController.createCard);

// Роут для удаления карточки по идентификатору
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required(),//что должно быть еще у id?
  }),
}), cardController.deleteCard);

// Роут для постановки лайка карточке
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required(), //что должно быть еще у id?

  }),
}), cardController.likeCard);

// Роут для удаления лайка с карточки
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required(), //что должно быть еще у id?
  }),
}), cardController.dislikeCard);
module.exports = router;
