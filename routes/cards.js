const express = require('express');

const router = express.Router();
const cardController = require('../controllers/cards');

// Роут для получения всех карточек
router.get('/', cardController.getAllCards);

// Роут для создания карточки
router.post('/', cardController.createCard);

// Роут для удаления карточки по идентификатору
router.delete('/:cardId', cardController.deleteCard);

// Роут для постановки лайка карточке
router.put('/:cardId/likes', cardController.likeCard);

// Роут для удаления лайка с карточки
router.delete('/:cardId/likes', cardController.dislikeCard);

module.exports = router;
