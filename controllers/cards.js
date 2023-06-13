const Card = require("../models/card");

// Получить все карточки
const getAllCards = (req, res) => {
  Card.find()
    .then((cards) => {
      res.send(cards);
    })
    .catch((error) => {
      res.status(500).send({ error: "Internal server error" });
    });
};

// Создать карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((error) => {
      res.status(500).send({ error: "Internal server error" });
    });
};

// Удалить карточку
const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ error: "Card not found" });
      }
      res.send(card);
    })
    .catch((error) => {
      res.status(500).send({ error: "Internal server error" });
    });
};

// Поставить лайк карточке
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      res.status(500).send({ error: "Internal server error" });
    });
};

// Убрать лайк с карточки
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      res.status(500).send({ error: "Internal server error" });
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
