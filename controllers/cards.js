const Card = require('../models/card');

// Получить все карточки
const getAllCards = (req, res) => {
  Card.find()
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// Удалить карточку
const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ error: 'Запрашиваемый пользователь не найден' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || (err.name === 'CastError')) {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// Поставить лайк карточке
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((cards) => {
      if (!cards) {
        res.status(404).send({ message: 'Карточки не найдены' });
      }
      res.status(200).send(cards);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || (err.name === 'CastError')) {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// Убрать лайк с карточки
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((cards) => {
      if (!cards) {
        res.status(404).send({ message: 'Нет такой карточки' });
      }
      res.status(200).send(cards);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || (err.name === 'CastError')) {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
